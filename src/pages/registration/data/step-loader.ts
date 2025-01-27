import type { Reg } from "@better-giving/registration/step";
import { type LoaderFunction, redirect } from "@vercel/remix";
import { ap, ver } from "api/api";
import type { UserV2 } from "types/auth";
import { parse, pipe, string, uuid } from "valibot";
import type { Reg$IdData, RegStep } from "../types";
import { getRegistrationState } from "./get-registration-state";
import { cognito, toAuth } from ".server/auth";

const uuidSchema = pipe(string(), uuid());

export async function getRegState(
  regIdParam: string | undefined,
  auth: UserV2
) {
  const regId = parse(uuidSchema, regIdParam);

  return ap
    .get<Reg>(`${ver(1)}/registrations/${regId}`, {
      headers: { authorization: auth.idToken },
    })
    .json()
    .then((data) => getRegistrationState(data));
}

export const regLoader: LoaderFunction = async ({ params, request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);
  return {
    user,
    reg: await getRegState(params.regId, user),
  } satisfies Reg$IdData;
};

export const stepLoader =
  (thisStep: RegStep): LoaderFunction =>
  async ({ params, request }) => {
    const { user, headers } = await cognito.retrieve(request);
    if (!user) return toAuth(request, headers);

    const state = await getRegState(params.regId, user);

    if (thisStep > state.step + 1) {
      return redirect(`../${state.step}`);
    }

    return state;
  };
