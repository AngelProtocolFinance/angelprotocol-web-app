import { blob } from "constants/urls";
import type { PageContext } from "../types";

export const civil_rights: PageContext = {
  meta_title: "Fund Justice & Advocacy Without Fees",
  meta_description:
    "supports civil rights nonprofits with fee-free fundraising. Fight injustice and fuel change. Start raising more today.",
  hero_copy: {
    1: "Zero platform fees. More ways to give. More funding for your equity mission.",
    2: "backs civil rights nonprofits fighting for equity, inclusion, and systemic change.",
  },
  red_copy:
    "Every dollar lost is a movement underfunded, a rally unorganized, a right left unprotected.",
  hero: blob("civil-rights-hero.png"),
  left: blob("civil-rights-left.png"),
  right: blob("civil-rights-right.png"),
};
