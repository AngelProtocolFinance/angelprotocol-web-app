import { redirect } from "react-router";
import { routes } from "./routes";
export const loader = () => redirect(routes.investments);
