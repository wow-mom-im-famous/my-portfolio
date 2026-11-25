"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "../../lib/db";
import { SECTIONS, SectionKey } from "../../lib/sections";
import { isAdmin, passwordOk, createSession, destroySession } from "../../lib/auth";
import * as starter from "../../data/content";

// Every action below (except login) runs this first.
async function guard() {
  if (!(await isAdmin())) redirect("/admin");
}

function sectionOf(fd: FormData): SectionKey {
  const s = String(fd.get("section") ?? "");
  if (!(s in SECTIONS)) throw new Error("Unknown section");
  return s as SectionKey;
}

// Keeps only the fields this section allows, trimmed and length-limited.
function cleanData(section: SectionKey, fd: FormData): Record<string, string> | null {
  const out: Record<string, string> = {};
  for (const f of SECTIONS[section].fields) {
    let v = String(fd.get(f.name) ?? "").trim().slice(0, f.long ? 1000 : 200);
    if (f.options && !f.options.some((o) => o.value === v)) v = f.options[0].value;
    out[f.name] = v;
  }
  const first = SECTIONS[section].fields[0].name;
  return out[first] ? out : null; // first field is required
}

function refresh() {
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function login(fd: FormData) {
  if (!passwordOk(String(fd.get("password") ?? ""))) {
    await new Promise((r) => setTimeout(r, 800)); // slows down guessing
    redirect("/admin?error=1");
  }
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin");
}

export async function addItem(fd: FormData) {
  await guard();
  const section = sectionOf(fd);
  const data = cleanData(section, fd);
  if (!data) return;
  const sql = db();
  await sql`insert into items (section, data) values (${section}, ${JSON.stringify(data)}::jsonb)`;
  refresh();
}

export async function updateItem(fd: FormData) {
  await guard();
  const section = sectionOf(fd);
  const id = Number(fd.get("id"));
  const data = cleanData(section, fd);
  if (!data || !Number.isInteger(id)) return;
  const sql = db();
  await sql`update items set data = ${JSON.stringify(data)}::jsonb where id = ${id} and section = ${section}`;
  refresh();
}

export async function deleteItem(fd: FormData) {
  await guard();
  const section = sectionOf(fd);
  const id = Number(fd.get("id"));
  if (!Number.isInteger(id)) return;
  const sql = db();
  await sql`delete from items where id = ${id} and section = ${section}`;
  refresh();
}

// One-time: copies the starter content from data/content.ts into the database.
export async function seed() {
  await guard();
  const sql = db();
  const [{ n }] = await sql`select count(*)::int as n from items`;
  if (n > 0) return;
  const seedData: Record<SectionKey, Record<string, string>[]> = {
    wasAt: starter.wasAt.map((x) => ({ year: x.year, text: x.text })),
    achievements: starter.achievements.map((x) => ({ year: x.year, text: x.text })),
    projects: starter.projects.map((p) => ({ title: p.title, stack: p.stack, year: p.year, status: p.status })),
    news: starter.news.map((x) => ({ title: x.title, date: x.date, text: x.text })),
    goals: starter.goals.map((g) => ({ label: g.label, text: g.text })),
  };
  for (const key of Object.keys(seedData) as SectionKey[]) {
    // "desc" sections show the newest-added first, so insert them in reverse
    const list = SECTIONS[key].order === "desc" ? [...seedData[key]].reverse() : seedData[key];
    for (const data of list) {
      await sql`insert into items (section, data) values (${key}, ${JSON.stringify(data)}::jsonb)`;
    }
  }
  refresh();
}
