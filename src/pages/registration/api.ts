import type { INpoClaim, IRegNew } from "@better-giving/reg";
import { reg_new } from "@better-giving/reg/schema";
import { app_routes } from "constants/routes";
import { search } from "helpers/https";
import { type ActionFunction, redirect } from "react-router";
import { parse } from "valibot";
import type { Route } from "./+types/layout";
import { steps } from "./routes";
import { cognito, to_auth } from ".server/auth";
import { npodb, regdb } from ".server/aws/db";
import { reg_cookie } from ".server/cookie";
import { is_claimed } from ".server/registration/helpers";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return to_auth(request, headers);
  return user;
};

export const new_application: ActionFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return to_auth(request, headers);

  const cookie = await reg_cookie
    .parse(request.headers.get("cookie"))
    .then((x) => x || {});

  const { claim: ein, referrer } = search(request);

  const endow = ein ? await npodb.npo_with_regnum(ein) : null;
  const claim = endow
    ? ({
        id: endow.id,
        ein: endow.registration_number,
        name: endow.name,
      } satisfies INpoClaim)
    : null;

  const payload: IRegNew = {
    r_id: user.email,
  };

  if (claim) payload.claim = claim;

  // user is registering via fresh referral link
  if (referrer) payload.referrer = referrer;

  /* user is registering on his own,
   * but he may have discovered the platform via previous referral
   */
  if (!referrer && cookie.referrer) {
    payload.referrer = cookie.referrer;
  }

  const parsed = parse(reg_new, payload);

  if (user.email !== parsed.r_id && !user.groups.includes("ap-admin")) {
    throw new Response("Unauthorized", { status: 403 });
  }

  if (parsed.claim && (await is_claimed(parsed.claim.ein))) {
    throw new Response(`to-claim:${parsed.claim.ein} is already claimed`, {
      status: 400,
    });
  }

  const id = await regdb.reg_put(parsed);
  cookie.reference = id;

  return redirect(`${app_routes.register}/${id}/${steps.contact}`, {
    headers: { "set-cookie": await reg_cookie.serialize(cookie) },
  });
};
