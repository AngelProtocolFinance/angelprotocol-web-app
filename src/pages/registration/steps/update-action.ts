import { regId } from "@better-giving/registration/models";
import { type Update, update } from "@better-giving/registration/update";
import { type ActionFunction, redirect } from "react-router";
import { parse } from "valibot";
import { cognito, toAuth } from ".server/auth";
import { updateRegistration } from ".server/registration/update-reg";

export const updateAction =
  (next: string): ActionFunction =>
  async ({ request, params }) => {
    const { user, headers } = await cognito.retrieve(request);
    if (!user) return toAuth(request, headers);

    const data: Update = await request.json();
    const id = parse(regId, params.regId);
    const upd8 = parse(update, data);

    const res = await updateRegistration(
      id,
      upd8,
      user.email,
      user.groups.includes("ap-admin")
    );
    if (Array.isArray(res)) {
      throw new Response(res[1], { status: res[0] });
    }

    return redirect(`../${next}`);
  };
