import { type ActionFunction, redirect } from "react-router";
import { cognito, to_auth } from ".server/auth";
import { stripe } from ".server/sdks";

export const action: ActionFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return to_auth(request, headers);
  const sub_id = params.sub_id;
  if (!sub_id) throw `missing sub id`;
  const { reason } = await request.json();
  await stripe.subscriptions.cancel(sub_id, {
    cancellation_details: { comment: reason },
  });
  return redirect("..");
};
