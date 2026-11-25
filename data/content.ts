// Everything you see on the site lives in this file.
// Edit the text here, save, and the page (and the Breaking News bar) updates.

export const site = {
  name: "Johaan Sebastian",
  initials: "JS", // shown on the loading screen
  city: "Bangalore",
  year: 2026, // footer copyright year
  tagline:
    "Software engineer building thoughtful products, writing about them, and shipping live demos.",
  stats: [
    { value: "[00]", label: "projects built" },
    { value: "[00]", label: "flagship" },
    { value: "[00]", label: "talks & stages" },
  ],
};

// Section ids and titles, in page order. They drive the navbar and the headings.
export const sections = [
  { id: "about", title: "About me" },
  { id: "was-at", title: "I was at..." },
  { id: "achievements", title: "Personal Achievements" },
  { id: "projects", title: "My Projects" },
  { id: "news", title: "News Flash" },
  { id: "want", title: "I want to..." },
  { id: "meet", title: "Meet me at..." },
];

export const about = {
  text: "A short statement about who you are, what you build, and what you care about. Two or three sentences work best.",
  chips: ["[Studying]", "[Founder]", "[Plays]"],
};

export type YearItem = { year: string; text: string };

export const wasAt: YearItem[] = [
  { year: "2026", text: "[Event or hackathon name]" },
  { year: "2025", text: "[Event or hackathon name]" },
  { year: "2024", text: "[Event or hackathon name]" },
];

export const achievements: YearItem[] = [
  { year: "2026", text: "[Award, certification, or milestone]" },
  { year: "2025", text: "[Award, certification, or milestone]" },
  { year: "2024", text: "[Award, certification, or milestone]" },
];

export type ProjectStatus = "up" | "arch" | "dev";

export const statusInfo: Record<ProjectStatus, { label: string; color: string }> = {
  up: { label: "Up and running", color: "#6F8F72" },
  arch: { label: "Archived", color: "#9A978F" },
  dev: { label: "In development", color: "#B79A5B" },
};

export type Project = {
  title: string;
  stack: string;
  year: string;
  status: ProjectStatus;
};

export const projects: Project[] = [
  { title: "[Project one]", stack: "Stack", year: "2026", status: "up" },
  { title: "[Project two]", stack: "Stack", year: "2023", status: "arch" },
  { title: "[Project three]", stack: "Stack", year: "2026", status: "dev" },
];

// Headlines here also scroll in the "Breaking News!" bar under your name.
export type NewsItem = { title: string; date: string; text: string };

export const news: NewsItem[] = [
  {
    title: "[Headline one]",
    date: "[Date]",
    text: "A short snippet in your own words. One or two sentences.",
  },
  {
    title: "[Headline two]",
    date: "[Date]",
    text: "A short snippet in your own words. One or two sentences.",
  },
  {
    title: "[Headline three]",
    date: "[Date]",
    text: "A short snippet in your own words. One or two sentences.",
  },
];

// "I want to..." cards. The row scrolls sideways, so add as many as you like.
export type Goal = { label: string; text: string };

export const goals: Goal[] = [
  { label: "2027", text: "[A goal, skill, or milestone you are aiming for]" },
  { label: "2028", text: "[A goal, skill, or milestone you are aiming for]" },
  { label: "2029", text: "[A goal, skill, or milestone you are aiming for]" },
  { label: "2030", text: "[A goal, skill, or milestone you are aiming for]" },
  { label: "Someday", text: "[A goal, skill, or milestone you are aiming for]" },
  { label: "Someday", text: "[A goal, skill, or milestone you are aiming for]" },
];

// "Meet me at..." rows. `href` makes each row clickable.
export type Contact = { value: string; label: string; href: string };

export const contacts: Contact[] = [
  { value: "johaan.sebastian.n.work@gmail.com", label: "Email", href: "mailto:johaan.sebastian.n.work@gmail.com" },
  { value: "Johaan Sebastian", label: "LinkedIn", href: "https://www.linkedin.com/in/johaan-sebastian-76315344b/" },
  { value: "wow-mom-im-famous", label: "GitHub", href: "https://github.com/wow-mom-im-famous" },
];
