import { regs_search } from "@better-giving/reg/schema";
import { search } from "helpers/https";
import { data } from "react-router";
import { safeParse } from "valibot";
import type { Route } from "./+types";
import { cognito, toAuth } from ".server/auth";
import { regdb } from ".server/aws/db";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const p = safeParse(regs_search, search(request));

  if (p.issues) {
    return new Response(p.issues[0].message, { status: 400 });
  }
  const page = await regdb.regs(p.output);

  return data(page);
};
