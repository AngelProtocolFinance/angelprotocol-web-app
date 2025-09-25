import { type ActionFunction, redirect } from "react-router";
import { isError } from "types/auth";
import { cognito, to_auth } from ".server/auth";

export const action: ActionFunction = async ({ request }) => {
  const { user, headers, session } = await cognito.retrieve(request);
  if (!user) return to_auth(request, headers);

  const recipient_id = await request.text();
  const result = await cognito.updateUserAttributes(
    [{ Name: "custom:pay_id", Value: recipient_id }],
    user.accessToken
  );
  if (result !== "success") throw result.message;

  const res = await cognito.refresh(session);

  if (isError(res)) throw res.message;

  return redirect("../referrals", {
    headers: {
      "set-cookie": res.commit,
      "x-remix-revalidate": "1",
      "cache-control": "no-cache",
    },
  });
};
