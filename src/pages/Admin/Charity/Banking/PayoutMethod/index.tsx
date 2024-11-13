import { bankUpdate } from "api/action/bank-update";
import { getPayoutMethod } from "api/get/payout-method";
import { plusInt } from "api/schema/endow-id";
import { loadAuth } from "auth/load-auth";
import { PromptV2 } from "components/Prompt";
import { APIs } from "constants/urls";
import {
  type ActionFunction,
  type LoaderFunction,
  type RouteObject,
  redirect,
} from "react-router-dom";
import { version as ver } from "services/helpers";
import * as v from "valibot";
import { DeletePrompt } from "./DeletePrompt";
import PayoutMethod from "./Loaded";

export { default } from "./Loaded";

export const payoutMethodLoader: LoaderFunction = async ({ params }) => {
  const id = v.parse(plusInt, params.id);
  const bankId = v.parse(plusInt, params.bankId);
  const auth = await loadAuth();
  if (!auth) throw "auth is required up higher";

  return getPayoutMethod(bankId, id, auth.idToken);
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
  const bankId = v.parse(plusInt, params.bankId);
  const res = await bankUpdate(bankId, { type: "prioritize" }, auth.idToken);
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
