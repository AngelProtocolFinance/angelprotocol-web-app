import { Buffer } from "node:buffer";
import { data, redirect } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@vercel/remix";
import { addDays } from "date-fns";
import { search } from "helpers/https";
import type { DetailedUser } from "types/auth";
import { cognito, oauth } from ".server/auth";
import { reg_cookie } from ".server/cookie";
import { user_bookmarks, user_npos } from ".server/user";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  /** handle oauth if applicable */
  const url = new URL(request.url);
  const { code, state, referrer } = search(url);
  const cookie_header = request.headers.get("cookie");

  /** HANDLE REFERRAL START */
  const rc = await reg_cookie.parse(cookie_header).then((x) => x || {});

  const prev_referrer = rc.referrer;
  const prev_referrer_expiry = rc.referrer_expiry;

  // user clicked a referral link again, different from the previous one
  if (referrer && prev_referrer && referrer !== prev_referrer) {
    const expiry = new Date(prev_referrer_expiry);
    rc.referrer = expiry > new Date() ? prev_referrer : referrer;
  }

  // user clicked a referral link for the first time
  if (referrer && !prev_referrer) {
    rc.referrer = referrer;
    const clicked = new Date();
    rc.referrer_expiry = addDays(clicked, 90).toISOString();
  }
  const rc_commit = await reg_cookie.serialize(rc);

  /** HANDLE REFERRAL END */

  /** HANDLE OAUTH CALLBACK */
  if (code && state) {
    const res = await oauth.exchange(code, url.origin, cookie_header);
    if (!res) return redirect(url.toString());

    //redirect to requestor
    const redirectTo = Buffer.from(state, "base64").toString();
    const headers = new Headers();
    headers.append("set-cookie", res);
    headers.append("set-cookie", rc_commit);
    return redirect(redirectTo, { headers });
  }

  const { user, headers } = await cognito.retrieve(cookie_header);
  headers?.append("set-cookie", rc_commit);
  if (!user) return data(null, { headers });

  const duser: DetailedUser = {
    ...user,
    bookmarks: user_bookmarks(user.email),
    orgs: user_npos(user.email),
  };

  return data(duser, { headers });
};
