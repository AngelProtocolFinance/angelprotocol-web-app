import { new_bank as schema } from "@better-giving/banking-applications/schema";
import { type ActionFunction, redirect } from "@vercel/remix";
import { adminRoutes } from "constants/routes";
import * as v from "valibot";
import { cognito, toAuth } from ".server/auth";
import { new_bank } from ".server/banking-applications";

export const action: ActionFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const payload = await request.json();
  const x = v.parse(schema, payload);

  await new_bank(x);

  return redirect(`../${adminRoutes.banking}`);
};
