import type { EndowClaim } from "@better-giving/registration/models";
import { type NewReg, newReg } from "@better-giving/registration/update";
import {
  type ActionFunction,
  type LoaderFunction,
  redirect,
} from "@vercel/remix";
import { appRoutes } from "constants/routes";
import { search } from "helpers/https";
import { parse } from "valibot";
import { steps } from "./routes";
import { cognito, toAuth } from ".server/auth";
import { npodb } from ".server/aws/db";
import { reg_cookie } from ".server/cookie";
import { env } from ".server/env";
import { createRegistration } from ".server/registration/create-reg";
import { is_claimed } from ".server/registration/helpers";

export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);
  return user;
};

export const newApplicationAction: ActionFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const cookie = await reg_cookie
    .parse(request.headers.get("Cookie"))
    .then((x) => x || {});

  const { claim: ein, referrer } = search(request);

  const endow = ein ? await npodb.npo_with_regnum(ein) : null;
  const claim = endow
    ? ({
        id: endow.id,
        ein: endow.registration_number,
        name: endow.name,
      } satisfies EndowClaim)
    : null;

  const payload: NewReg = {
    registrant_id: user.email,
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

  const init = parse(newReg, payload);

  if (user.email !== init.registrant_id && !user.groups.includes("ap-admin")) {
    throw new Response("Unauthorized", { status: 403 });
  }

  if (init.claim && (await is_claimed(init.claim.ein))) {
    throw new Response(`to-claim:${init.claim.id} is already claimed`, {
      status: 400,
    });
  }

  const id = await createRegistration(init, env);

  cookie.reference = id;

  return redirect(`${appRoutes.register}/${id}/${steps.contact}`, {
    headers: { "Set-Cookie": await reg_cookie.serialize(cookie) },
  });
};
