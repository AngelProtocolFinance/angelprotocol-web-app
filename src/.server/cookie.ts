import { createCookie } from "@vercel/remix";
import { session_secret } from "./env";
export const reg_cookie = createCookie("bg-registration");
export const bg_session = createCookie("bg-session", {
  secrets: [session_secret],
});
