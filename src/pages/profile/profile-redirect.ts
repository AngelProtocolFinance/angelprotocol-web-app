import { href, redirect } from "react-router";
import type { Route } from "./+types";

export const loader = ({ params }: Route.LoaderArgs) =>
  redirect(href("/marketplace/:id", { id: params.id }));
