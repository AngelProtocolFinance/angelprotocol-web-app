import type { ActionFunction } from "@vercel/remix";
import { ap, ver } from "api/api";
import type { ActionData } from "types/action";
import { cognito, toAuth } from ".server/auth";

export const submitAction: ActionFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  await ap.post(`${ver(1)}/registrations/${params.regId}/submit`, {
    headers: { authorization: user.idToken },
  });

  return {
    __ok: "Your application has been submitted. We will get back to you soon!",
  } satisfies ActionData;
};
