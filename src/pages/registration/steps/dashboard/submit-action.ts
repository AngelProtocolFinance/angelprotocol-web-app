import { regId } from "@better-giving/registration/models";
import { isDone } from "@better-giving/registration/step";
import type { ActionFunction } from "@vercel/remix";
import type { ActionData } from "types/action";
import { parse } from "valibot";
import { cognito, toAuth } from ".server/auth";
import { getReg } from ".server/registration/get-reg";
import { submit } from ".server/registration/submit";

export const submitAction: ActionFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const id = parse(regId, params.regId);
  const reg = await getReg(id);

  if (!reg) throw new Response("Registration not found", { status: 404 });

  if (!isDone.banking(reg)) {
    throw `Registration not ready for submission`;
  }

  if (
    user.email !== reg.registrant_id.toLowerCase() &&
    !user.groups.includes("ap-admin")
  ) {
    throw new Response("", { status: 403 });
  }

  await submit(reg);

  return {
    __ok: "Your application has been submitted. We will get back to you soon!",
  } satisfies ActionData;
};
