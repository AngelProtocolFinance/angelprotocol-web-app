import { blob } from "constants/urls";
import type { PageContext } from "../types";

export const mental_health: PageContext = {
  meta_subject: {
    title: "Mental Health Nonprofits",
    description: "mental health nonprofits",
  },
  hero_subject: {
    1: "healing",
    2: "mental health mission",
  },
  cta: {
    pre: "Listen. Heal.",
    body: "For mental health nonprofits restoring hope and resilience",
  },
  hero: blob("F%20-%20Mental%20Health%20%26%20Crisis%20Intervention.png"),
  left: blob("Left.png"),
  right: blob("Right.png"),
  partners: "mental health nonprofits",
};
