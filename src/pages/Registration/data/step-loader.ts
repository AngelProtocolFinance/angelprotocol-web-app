import type { Reg } from "@better-giving/registration/step";
import { loadAuth } from "auth";
import { APIs } from "constants/urls";
import { type LoaderFunction, redirect } from "react-router-dom";
import { version as v } from "services/helpers";
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
  const url = new URL(APIs.aws);
  url.pathname = `${v(1)}/registrations/${regId}`;

  const req = new Request(url);
  req.headers.set("authorization", auth.idToken);

  return fetch(req)
    .then<Reg>((res) => res.json())
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
