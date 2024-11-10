import { getPayoutMethod } from "api/get/payout-method";
import { endowId } from "api/schema/endow-id";
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
import type { Priority } from "types/aws";
import * as v from "valibot";
import { DeletePrompt } from "./DeletePrompt";
import PayoutMethod from "./Loaded";

export { default } from "./Loaded";

export const payoutMethodLoader: LoaderFunction = async ({ params }) => {
  const id = v.parse(endowId, params.id);
  const bankId = v.parse(endowId, params.bankId);
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
