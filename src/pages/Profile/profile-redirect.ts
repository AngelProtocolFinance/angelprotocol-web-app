import { type LoaderFunction, redirect } from "@vercel/remix";
import { appRoutes } from "constants/routes";

export const loader: LoaderFunction = ({ params }) =>
  redirect(`${appRoutes.marketplace}/${params.id}`);
