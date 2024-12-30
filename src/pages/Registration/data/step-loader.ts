import type { Reg } from "@better-giving/registration/step";
import { ap, ver } from "api/api";
import { loadAuth } from "auth";
import { type LoaderFunction, redirect } from "react-router";
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

export const regLoader: LoaderFunction = async ({ params }) => {
  const auth = await loadAuth();
  if (!auth) throw "user must have been authenticated higher up";
  return {
    user: auth,
    reg: await getRegState(params.regId, auth),
  } satisfies Reg$IdData;
};

export const stepLoader =
  (thisStep: RegStep): LoaderFunction =>
  async ({ params }) => {
    const auth = await loadAuth();
    if (!auth) throw "user must have been authenticated higher up";

    const state = await getRegState(params.regId, auth);

    if (thisStep > state.step + 1) {
      return redirect(`../${state.step}`);
    }

    return state;
  };
