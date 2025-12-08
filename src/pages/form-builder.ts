import { href, redirect } from "react-router";
export const loader = async () => redirect(href("/dashboard/forms"));
