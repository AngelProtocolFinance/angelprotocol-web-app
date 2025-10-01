import { page_opts } from "@better-giving/donation/schema";
import { search } from "helpers/https";
import { parse } from "valibot";
import type { Route } from "./+types";
import { to_row } from "./helpers";
import { cognito, to_auth } from ".server/auth";
import { onholddb } from ".server/aws/db";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return to_auth(request, headers);
  const raw = search(request);
  const { next, limit = 10 } = parse(page_opts, raw);
  const { items, next: n } = await onholddb.list_by_email(user.email, {
    next,
    limit,
  });

  return { next: n, user, items: items.map(to_row) };
};
