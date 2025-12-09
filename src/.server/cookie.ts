import { createCookie } from "react-router";
import { session_secret } from "./env";
export const reg_cookie = createCookie("bg-registration", { path: "/" });
export const bg_session = createCookie("bg-session", {
  secrets: [session_secret],
});

// give temporary donation access
export const donations_cookie = createCookie("donations", {
  path: "/",
  secrets: [session_secret],
  secure: true,
  sameSite: "none",
});

/** Map of donation intent ID to expiry timestamp (milliseconds since epoch) */
export interface IDonationIntentExpiries extends Record<string, number> {}
