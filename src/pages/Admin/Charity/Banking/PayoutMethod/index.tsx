import { bankUpdate } from "api/action/bank-update";
import { ap, ver } from "api/api";
import { getPayoutMethod } from "api/get/payout-method";
import { plusInt } from "api/schema/endow-id";
import { loadAuth } from "auth/load-auth";
import { PromptV2 } from "components/Prompt";
import {
  type ActionFunction,
  type LoaderFunction,
  type RouteObject,
  redirect,
} from "react-router";
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

  await ap.delete(`${ver(1)}/banking-applications/${params.bankId}`, {
    headers: { authorization: auth.idToken },
  });
  return redirect("../..");
};

const prioritizeAction: ActionFunction = async ({ params }) => {
  const auth = await loadAuth();
  if (!auth) throw "auth is required up higher";
  const bankId = v.parse(plusInt, params.bankId);
  await bankUpdate(bankId, { type: "prioritize" }, auth.idToken);
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
