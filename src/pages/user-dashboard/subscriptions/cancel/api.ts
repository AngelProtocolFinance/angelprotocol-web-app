import { type ActionFunction, redirect } from "@vercel/remix";
import { cognito, toAuth } from ".server/auth";
import { stripe } from ".server/sdks";

export const action: ActionFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);
  const sub_id = params.sub_id;
  if (!sub_id) throw `missing sub id`;
  const { reason } = await request.json();
  await stripe.subscriptions.cancel(sub_id, {
    cancellation_details: { comment: reason },
  });
  return redirect("..");
};
