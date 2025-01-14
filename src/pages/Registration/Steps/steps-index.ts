import { redirect } from "@vercel/remix";
import { steps } from "../routes";
export const loader = () => redirect(steps.contact);
