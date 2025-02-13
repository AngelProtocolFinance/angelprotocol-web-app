import type { Allocation } from "@better-giving/endowment";
import type { LoaderFunction } from "@vercel/remix";
import { getEndow } from "api/get/endow";
import { getEndowBalance } from "api/get/endow-balance";
import { plusInt } from "api/schema/endow-id";
import type { EndowmentBalances } from "types/npo-balance";
import * as v from "valibot";
import { endowUpdate } from "../endow-update-action";
import { cognito, toAuth } from ".server/auth";

const getAllocation = (id: number) =>
  getEndow(id, ["allocation"]).then<Allocation>(
    (data) => data.allocation ?? { cash: 0, liq: 100, lock: 0 }
  );

export interface DashboardData {
  id: number;
  alloc: Allocation;
  bal: EndowmentBalances;
}

export const endowUpdateAction = endowUpdate({ redirect: "." });
export const dashboardData: LoaderFunction = async ({ params, request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const id = v.parse(plusInt, params.id);
  return {
    id,
    alloc: await getAllocation(id),
    bal: await getEndowBalance(id.toString()),
  } satisfies DashboardData;
};
