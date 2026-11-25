import { db } from "./db";
import { SECTIONS, SectionKey } from "./sections";
import * as starter from "../data/content";
import type { YearItem, Project, NewsItem, Goal } from "../data/content";

export type Content = {
  wasAt: YearItem[];
  achievements: YearItem[];
  projects: Project[];
  news: NewsItem[];
  goals: Goal[];
};

// Shown if the database is empty or can't be reached, so the site never breaks.
const fallback: Content = {
  wasAt: starter.wasAt,
  achievements: starter.achievements,
  projects: starter.projects,
  news: starter.news,
  goals: starter.goals,
};

export type Row = { id: number; section: SectionKey; data: Record<string, string> };

export async function getRows(): Promise<Row[]> {
  const sql = db();
  const rows = await sql`select id, section, data from items order by id`;
  return rows
    .filter((r) => r.section in SECTIONS)
    .map((r) => ({ id: Number(r.id), section: r.section as SectionKey, data: r.data }));
}

export async function getContent(): Promise<Content> {
  try {
    const rows = await getRows();
    if (!rows.length) return fallback;
    const pick = <T>(k: SectionKey): T[] => {
      const list = rows.filter((r) => r.section === k).map((r) => r.data as unknown as T);
      return SECTIONS[k].order === "desc" ? list.reverse() : list;
    };
    return {
      wasAt: pick<YearItem>("wasAt"),
      achievements: pick<YearItem>("achievements"),
      projects: pick<Project>("projects"),
      news: pick<NewsItem>("news"),
      goals: pick<Goal>("goals"),
    };
  } catch {
    return fallback;
  }
}
