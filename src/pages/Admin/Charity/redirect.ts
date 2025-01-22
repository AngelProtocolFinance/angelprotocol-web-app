import { redirect } from "@vercel/remix";
export const loader = () => redirect("dashboard");
