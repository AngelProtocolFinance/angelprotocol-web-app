import { getUnixTime } from "date-fns";
import { redirect } from "react-router";
import type { Route } from "./+types";
import { cognito, to_auth } from ".server/auth";
import { subsdb } from ".server/aws/db";

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return to_auth(request, headers);

  const { reason } = await request.json();
  await subsdb.update(params.sub_id, {
    status: "inactive",
    status_cancel_reason: reason,
    updated_at: getUnixTime(new Date()),
  });

  return redirect("..");
};
