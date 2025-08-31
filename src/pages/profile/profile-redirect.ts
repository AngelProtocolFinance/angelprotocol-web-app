import { appRoutes } from "constants/routes";
import { type LoaderFunction, redirect } from "react-router";

export const loader: LoaderFunction = ({ params }) =>
  redirect(`${appRoutes.marketplace}/${params.id}`);
