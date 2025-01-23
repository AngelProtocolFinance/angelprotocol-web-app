import { redirect } from "@vercel/remix";
import { routes } from "./routes";
export const loader = () => redirect(routes.edit_profile);
