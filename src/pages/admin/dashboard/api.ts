import type { Allocation } from "@better-giving/endowment";
import { getEndow } from "api/get/endow";
import { plusInt } from "api/schema/endow-id";
import { default_allocation } from "constants/common";
import type { LoaderFunction } from "react-router";
import type { EndowmentBalances } from "types/npo-balance";
import * as v from "valibot";
import { endowUpdate } from "../endow-update-action";
import { cognito, toAuth } from ".server/auth";
import { npoBalances } from ".server/npo-balances";

const getAllocation = (id: number) =>
  getEndow(id, ["allocation"]).then<Allocation>(
    (data) => data.allocation ?? default_allocation
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
    bal: await npoBalances(id),
  } satisfies DashboardData;
};
