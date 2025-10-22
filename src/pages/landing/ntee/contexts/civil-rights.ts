import { blob } from "constants/urls";
import type { PageContext } from "../types";

export const civil_rights: PageContext = {
  meta_title: "Fund Justice & Advocacy Without Fees",
  meta_description:
    "supports civil rights nonprofits with fee-free fundraising. Fight injustice and fuel change. Start raising more today.",
  hero_subject: {
    1: "equity",
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
