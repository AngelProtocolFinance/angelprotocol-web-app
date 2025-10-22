import { blob } from "constants/urls";
import type { PageContext } from "../types";

export const civil_rights: PageContext = {
  meta_subject: {
    title: "Advocacy Nonprofits",
    description: "advocacy nonprofits",
  },
  hero_subject: {
    1: "change",
    2: "advocacy mission",
  },
  cta: {
    pre: "Stand. Speak.",
    body: "For advocacy nonprofits driving social change",
  },
  hero: blob("civil-rights-hero.png"),
  left: blob("civil-rights-left.png"),
  right: blob("civil-rights-right.png"),
  partners: "advocacy nonprofits",
};
