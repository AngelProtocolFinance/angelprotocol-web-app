import { resp } from "helpers/https";
import type { LoaderFunction } from "react-router";
import { cognito } from ".server/auth";
import { get_db_currencies } from ".server/currency";

export const loader: LoaderFunction = async ({ request }) => {
  const { user } = await cognito.retrieve(request);
  const user_ip =
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip");

  const pref_currency =
    user?.currency || (user_ip ? await currency_from_ip(user_ip) : undefined);

  const data = await get_db_currencies(pref_currency);
  return resp.json(data);
};

async function currency_from_ip(user_ip: string): Promise<string | undefined> {
  // https://ipapi.co/api/#specific-location-field
  const res = await fetch(`https://ipapi.co/${user_ip}/currency/`);
  if (!res.ok) return;
  return res.text();
}
