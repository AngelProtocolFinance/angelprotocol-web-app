import { type ActionFunction, redirect } from "react-router";
import { parse } from "valibot";
import { kycSchema } from "./schema";
import { cognito, toAuth } from ".server/auth";
import { sendDonationReceipt } from ".server/donation-receipt";

export { default } from "./kyc-form";
export { ErrorModal as ErrorBoundary } from "components/error";
export const action: ActionFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const update = await request.json();
  const parsed = parse(kycSchema, update);
  await sendDonationReceipt(params.id!, parsed);

  return redirect("..");
};
