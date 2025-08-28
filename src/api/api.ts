import ky from "ky";
export { version as ver, toSearch } from "./helpers";

export const apUrl = "https://ap-api.better.giving";
export const ap = ky.create({ prefixUrl: apUrl, timeout: false });

export const wpUrl = "https://angelgiving.10web.site/wp-json/wp/v2";
export const wp = ky.create({
  prefixUrl: wpUrl,
  timeout: false,
});
