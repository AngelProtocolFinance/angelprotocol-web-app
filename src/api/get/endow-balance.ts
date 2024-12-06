import { plusInt } from "api/schema/endow-id";
import { APIs } from "constants/urls";
import { version as v } from "services/helpers";
import type { EndowmentBalances } from "types/aws";
import { parse } from "valibot";

export async function getEndowBalance(idParam: string | undefined) {
  const id = parse(plusInt, idParam);
  const url = new URL(APIs.apes);
  url.pathname = `${v(1)}/balances/${id}`;
  return fetch(url).then<EndowmentBalances>((res) => res.json());
}
