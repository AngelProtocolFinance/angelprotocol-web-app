import { type LoaderFunction, redirect } from "react-router";
import { steps } from "../routes";
export const loader: LoaderFunction = () => redirect(steps.contact);
