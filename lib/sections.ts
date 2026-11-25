import { statusInfo } from "../data/content";

export type SectionKey = "wasAt" | "achievements" | "projects" | "news" | "goals";

export type Field = {
  name: string;
  label: string;
  long?: boolean; // multi-line text box
  options?: { value: string; label: string }[]; // drop-down
};

type SectionDef = {
  label: string;
  // "desc" = newest added shows first, "asc" = oldest added shows first
  order: "asc" | "desc";
  fields: Field[];
};

export const SECTIONS: Record<SectionKey, SectionDef> = {
  wasAt: {
    label: "I was at...",
    order: "desc",
    fields: [
      { name: "year", label: "Year" },
      { name: "text", label: "Event or hackathon" },
    ],
  },
  achievements: {
    label: "Personal Achievements",
    order: "desc",
    fields: [
      { name: "year", label: "Year" },
      { name: "text", label: "Achievement" },
    ],
  },
  projects: {
    label: "My Projects",
    order: "asc",
    fields: [
      { name: "title", label: "Project name" },
      { name: "stack", label: "Tech stack" },
      { name: "year", label: "Year" },
      {
        name: "status",
        label: "Status",
        options: Object.entries(statusInfo).map(([value, v]) => ({ value, label: v.label })),
      },
    ],
  },
  news: {
    label: "News Flash",
    order: "desc",
    fields: [
      { name: "title", label: "Headline (also shown in the Breaking News bar)" },
      { name: "date", label: "Date" },
      { name: "text", label: "Snippet", long: true },
    ],
  },
  goals: {
    label: "I want to...",
    order: "asc",
    fields: [
      { name: "label", label: "When (a year, or Someday)" },
      { name: "text", label: "Goal", long: true },
    ],
  },
};

export const SECTION_KEYS = Object.keys(SECTIONS) as SectionKey[];
