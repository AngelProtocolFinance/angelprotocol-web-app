import type { Reg } from "@better-giving/registration/step";
import { type LoaderFunction, redirect } from "@remix-run/react";
import { ap, ver } from "api/api";
import { loadAuth, redirectToAuth } from "auth";
import type { UserV2 } from "types/auth";
import { parse, pipe, string, uuid } from "valibot";
import type { Reg$IdData, RegStep } from "../types";
import { getRegistrationState } from "./getRegistrationState";

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
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);
  return {
    user: auth,
    reg: await getRegState(params.regId, auth),
  } satisfies Reg$IdData;
};

export const stepLoader =
  (thisStep: RegStep): LoaderFunction =>
  async ({ params, request }) => {
    const auth = await loadAuth();
    if (!auth) return redirectToAuth(request);

    const state = await getRegState(params.regId, auth);

    if (thisStep > state.step + 1) {
      return redirect(`../${state.step}`);
    }

    return state;
  };
