import { interest_log } from "@better-giving/liquid/schemas";
import { resp } from "helpers/https";
import type { ActionFunction } from "react-router";
import { parse } from "valibot";
import { cognito, to_auth } from ".server/auth";
import { npo_interest_shares } from ".server/npos-interest-share";

export const action: ActionFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return to_auth(request, headers);
  if (!user.groups.includes("ap-admin")) return { status: 403 };

  const fv = parse(interest_log, await request.json());

  const shares = await npo_interest_shares({
    start: fv.date_start,
    end: fv.date_end,
  });

  return resp.json(shares);
};
