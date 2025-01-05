import { createCookieSessionStorage } from "@remix-run/node";

/** type: bearer */
export interface Token {
  bg_token_id: string;
  bg_token_access: string;
  bg_token_refresh: string;
  /** iso-date */
  bg_token_expiry: string;
}

interface FlashData {
  error: string;
}

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<Token, FlashData>({
    cookie: { name: "bg_session", secrets: [process.env.SESSION_SECRET!] },
  });

export type Stored = Awaited<ReturnType<typeof getSession>>;
