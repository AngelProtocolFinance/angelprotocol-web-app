import { app_routes } from "constants/routes";
import { type LoaderFunction, redirect } from "react-router";

export const loader: LoaderFunction = ({ params }) =>
  redirect(`${app_routes.marketplace}/${params.id}`);
