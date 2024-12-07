import { env } from "constants/env";
import ky from "ky";
import { version as v } from "./helpers";
export { version as ver, toSearch } from "./helpers";

const apUrl = "https://ap-api.better.giving";
export const ap = ky.create({ prefixUrl: apUrl });
export const wise = ap.extend({ prefixUrl: `${apUrl}/${v(1)}/wise-proxy` });
export const apes = ky.create({
  prefixUrl: `https://apes-api.better.giving/${env}`,
});
