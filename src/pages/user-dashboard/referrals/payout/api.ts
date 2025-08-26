import { type ActionFunction, redirect } from "react-router";
import { isError } from "types/auth";
import { cognito, toAuth } from ".server/auth";

export const action: ActionFunction = async ({ request }) => {
  const { user, headers, session } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

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
      "Set-Cookie": res.commit,
      "X-Remix-Revalidate": "1",
      "Cache-Control": "no-cache",
    },
  });
};
