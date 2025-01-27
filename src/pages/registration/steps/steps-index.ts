import { type LoaderFunction, redirect } from "@vercel/remix";
import { steps } from "../routes";
export const loader: LoaderFunction = () => redirect(steps.contact);
