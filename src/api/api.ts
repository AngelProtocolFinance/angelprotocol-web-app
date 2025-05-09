import { env } from "constants/env";
import { APIs } from "constants/urls";
import ky from "ky";
import { version as v } from "./helpers";
export { version as ver, toSearch } from "./helpers";

export const apUrl = "https://ap-api.better.giving";
export const ap = ky.create({ prefixUrl: apUrl, timeout: false });
export const wise = ap.extend({
  prefixUrl: `${apUrl}/${v(1)}/wise-proxy`,
  timeout: false,
});

export const apesUrl = `https://apes-api.better.giving/${env}`;
export const apes = ky.create({
  prefixUrl: apesUrl,
  timeout: false,
});

export const hsNewsletterSubs = ky.create({ prefixUrl: APIs.hubspotForms });

export const wpUrl = "https://angelgiving.10web.site/wp-json/wp/v2";
export const wp = ky.create({
  prefixUrl: wpUrl,
  timeout: false,
});
