import type { LoaderFunction } from "@vercel/remix";
import { plusInt } from "api/schema/endow-id";
import type { PayoutMethod } from "types/applications";
import { parse } from "valibot";
import { cognito, toAuth } from ".server/auth";
import { npo_banks } from ".server/banking-applications/banking-applications";

export interface LoaderData {
  methods: PayoutMethod[];
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const id = parse(plusInt, params.id);
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  if (!user.endowments.includes(id)) throw `not authorized`;

  const items = await npo_banks(id);
  return { methods: items } satisfies LoaderData;
};
