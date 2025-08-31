import { createClient } from "@vercel/kv";
import { createKvSessionStorage } from "@vercel/react-router";
import { bg_session } from "../cookie";
import { kv_envs } from "../env";

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

const kv = createClient(kv_envs);

export const { getSession, commitSession, destroySession } =
  createKvSessionStorage<SessionData, FlashData>({
    kv,
    cookie: bg_session,
  });

export type Stored = Awaited<ReturnType<typeof getSession>>;
