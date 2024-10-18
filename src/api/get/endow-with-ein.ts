import { APIs } from "constants/urls";
import { apiEnv } from "services/constants";
import type { Endowment } from "types/aws";

export const getEndowWithEin = async (ein: string) => {
  const url = new URL(APIs.aws);
  url.pathname = "v8/endowments";
  url.searchParams.set("env", apiEnv);
  url.searchParams.set("ein", ein);
  const res = await fetch(url);
  if (res.status === 404) return undefined;

  if (!res.ok) throw await res.text();

  return res.json() as Promise<Endowment>;
};
