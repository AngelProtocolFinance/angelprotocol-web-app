import { createClient } from "@vercel/kv";
import { createKvSessionStorage } from "@vercel/remix";

/** type: bearer */
export interface SessionData {
  token_id: string;
  token_access: string;
  token_refresh: string;
  /** iso-date */
  token_expiry: string;
}

interface FlashData {
  error: string;
}

const kv = createClient({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export const { getSession, commitSession, destroySession } =
  createKvSessionStorage<SessionData, FlashData>({
    kv,
    cookie: { name: "bg_session", secrets: [process.env.SESSION_SECRET!] },
  });

export type Stored = Awaited<ReturnType<typeof getSession>>;
