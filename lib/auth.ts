import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE = "admin_session";
const DAYS = 7;

const secret = () => process.env.ADMIN_SECRET ?? "";
const sign = (v: string) => createHmac("sha256", secret()).update(v).digest("hex");

// Compares passwords without leaking timing information.
export function passwordOk(input: string): boolean {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw || !secret()) return false;
  const h = (s: string) => createHmac("sha256", "pw-compare").update(s).digest();
  return timingSafeEqual(h(input), h(pw));
}

export async function createSession() {
  const expires = String(Date.now() + DAYS * 864e5);
  (await cookies()).set(COOKIE, `${expires}.${sign(expires)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: DAYS * 86400,
  });
}

export async function destroySession() {
  (await cookies()).delete(COOKIE);
}

export async function isAdmin(): Promise<boolean> {
  if (!secret()) return false;
  const value = (await cookies()).get(COOKIE)?.value;
  if (!value) return false;
  const [expires, sig] = value.split(".");
  if (!expires || !sig) return false;
  const a = Buffer.from(sig);
  const b = Buffer.from(sign(expires));
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  return Number(expires) > Date.now();
}
