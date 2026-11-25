import { neon } from "@neondatabase/serverless";

// Created on demand so the build doesn't crash when DATABASE_URL isn't set yet.
export function db() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return neon(url);
}
