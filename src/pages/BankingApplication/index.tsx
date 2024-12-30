import { bankUpdate } from "api/action/bank-update";
import { getPayoutMethod } from "api/get/payout-method";
import { plusInt } from "api/schema/endow-id";
import { loadAuth } from "auth";
import { PromptV2 } from "components/Prompt";
import { parseWithValibot } from "conform-to-valibot";
import {
  type ActionFunction,
  type LoaderFunction,
  type RouteObject,
  redirect,
} from "react-router";
import { bankingApplicationUpdate } from "types/aws";
import { parse } from "valibot";
import * as v from "valibot";
import { BankingApplication } from "./BankingApplication";
import { Prompt } from "./Prompt";

const loader: LoaderFunction = async ({ params }) => {
  const bankId = parse(plusInt, params.id);
  const auth = await loadAuth();
  if (!auth) throw "auth is required up higher";

  return getPayoutMethod(bankId, "bg-admin", auth.idToken);
};

const verdicAction: ActionFunction = async ({ params, request }) => {
  const auth = await loadAuth();
  if (!auth) throw "auth is required up higher";

  const fv = await request.formData();
  const payload = parseWithValibot(fv, { schema: bankingApplicationUpdate });
  if (payload.status !== "success") return payload.reply();

  const bankId = v.parse(plusInt, params.id);
  const res = await bankUpdate(bankId, payload.value, auth.idToken);
  if (!res.ok) throw res;
  return redirect("../success");
};

export const bankApplicationRoute: RouteObject = {
  path: ":id",
  loader,
  element: <BankingApplication />,
  children: [
    {
      path: "approve",
      action: verdicAction,
      element: <Prompt verdict="approved" />,
    },
    {
      path: "reject",
      action: verdicAction,
      element: <Prompt verdict="rejected" />,
    },
    {
      path: "success",
      element: <PromptV2 type="success" children="Review submitted" />,
    },
  ],
};
