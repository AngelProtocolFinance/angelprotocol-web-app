import type { EndowClaim } from "@better-giving/registration/models";
import { type NewReg, newReg } from "@better-giving/registration/update";
import {
  type ActionFunction,
  type LoaderFunction,
  data,
  redirect,
} from "@vercel/remix";
import { getEndowWithEin } from "api/get/endow-with-ein";
import { appRoutes } from "constants/routes";
import { parse } from "valibot";
import { regCookie } from "./data/cookie.server";
import { steps } from "./routes";
import { cognito, toAuth } from ".server/auth";
import { env } from ".server/env";
import { createRegistration } from ".server/registration/create-reg";
import { isClaimed } from ".server/registration/helpers";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const referrer = url.searchParams.get("referrer");
  const cookie = await regCookie
    .parse(request.headers.get("Cookie"))
    .then((x) => x || {});

  const prev_referrer = cookie.referrer;
  const prev_referrer_expiry = cookie.referrer_expiry;

  // user clicked a referral link again, different from the previous one
  if (referrer && prev_referrer && referrer !== prev_referrer) {
    const expiry = new Date(prev_referrer_expiry);
    cookie.referrer = expiry > new Date() ? prev_referrer : referrer;
  }

  // user clicked a referral link for the first time
  if (referrer && !prev_referrer) {
    cookie.referrer = referrer;
    const duration = 15 * 24 * 60 * 60; // 15 days
    cookie.referrer_expiry = new Date(
      Date.now() + duration * 1000
    ).toISOString();
  }

  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  return data(user, {
    headers: { "Set-Cookie": await regCookie.serialize(cookie) },
  });
};

export const newApplicationAction: ActionFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const url = new URL(request.url);
  const cookie = await regCookie
    .parse(request.headers.get("Cookie"))
    .then((x) => x || {});

  const ein = url.searchParams.get("claim");
  const referrer = url.searchParams.get("referrer");
  const endow = ein ? await getEndowWithEin(ein) : null;
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

  if (init.claim && (await isClaimed(init.claim.ein, env))) {
    throw new Response(`to-claim:${init.claim.id} is already claimed`, {
      status: 400,
    });
  }

  const id = await createRegistration(init, env);

  cookie.reference = id;

  return redirect(`${appRoutes.register}/${id}/${steps.contact}`, {
    headers: { "Set-Cookie": await regCookie.serialize(cookie) },
  });
};
