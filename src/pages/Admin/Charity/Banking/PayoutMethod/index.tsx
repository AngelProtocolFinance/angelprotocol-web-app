import { endowId } from "api/schema/endow-id";
import { loadAuth } from "auth/load-auth";
import { PromptV2 } from "components/Prompt";
import { APIs } from "constants/urls";
import { cacheGet } from "helpers/cache-get";
import {
  type ActionFunction,
  type LoaderFunction,
  type RouteObject,
  redirect,
} from "react-router-dom";
import { version as ver } from "services/helpers";
import type {
  BankingApplication,
  Priority,
  V2RecipientAccount,
} from "types/aws";
import * as v from "valibot";
import { DeletePrompt } from "./DeletePrompt";
import PayoutMethod from "./Loaded";

export { default } from "./Loaded";

export interface BankDetails extends V2RecipientAccount, BankingApplication {}

export const payoutMethodLoader: LoaderFunction = async ({ params }) => {
  const id = v.parse(endowId, params.id);
  const bankId = v.parse(endowId, params.bankId);
  const auth = await loadAuth();
  if (!auth) throw "auth is required up higher";

  const bank = new URL(APIs.aws);
  bank.pathname = `${ver(1)}/banking-applications/${bankId}`;
  bank.searchParams.set("requestor", "endowment");
  bank.searchParams.set("endowmentID", id.toString());
  const bankReq = new Request(bank);
  bankReq.headers.set("authorization", auth.idToken);

  const wise = new URL(APIs.aws);
  wise.pathname = `${ver(1)}/wise-proxy/v2/accounts/${bankId}`;
  const wiseReq = new Request(wise);
  wiseReq.headers.set("authorization", auth.idToken);

  return Promise.all([
    cacheGet(bankReq).then((res) => res.json()),
    cacheGet(wiseReq).then((res) => res.json()),
  ]).then<BankDetails>(([a, b]) => ({ ...a, ...b }));
};

const deleteAction: ActionFunction = async ({ params }) => {
  const auth = await loadAuth();
  if (!auth) throw "auth is required up higher";

  const url = new URL(APIs.aws);
  url.pathname = `${ver(1)}/banking-applications/${params.bankId}`;
  const bankReq = new Request(url, { method: "DELETE" });
  bankReq.headers.set("authorization", auth.idToken);

  const res = await fetch(bankReq);
  if (!res.ok) throw res;
  return redirect("../..");
};

const prioritizeAction: ActionFunction = async ({ params }) => {
  const auth = await loadAuth();
  if (!auth) throw "auth is required up higher";

  const url = new URL(APIs.aws);
  url.pathname = `${ver(1)}/banking-applications/${params.bankId}`;
  url.searchParams.set("type", "prioritize");
  const bankReq = new Request(url, {
    method: "PUT",
    body: JSON.stringify({ type: "prioritize" } satisfies Priority),
  });
  bankReq.headers.set("authorization", auth.idToken);

  const res = await fetch(bankReq);
  if (!res.ok) throw res;
  return redirect("success");
};

export const payoutMethodRoute: RouteObject = {
  path: ":bankId",
  element: <PayoutMethod />,
  action: prioritizeAction,
  loader: payoutMethodLoader,
  children: [
    { path: "delete", element: <DeletePrompt />, action: deleteAction },
    {
      path: "success",
      element: <PromptV2 type="success" children="Payout method updated" />,
    },
  ],
};
