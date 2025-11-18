import { DonationsDb } from "@better-giving/donation";
import type { ActionFunction, LoaderFunction } from "react-router";
import { isResponse, validateApiKey } from "./helpers/validate-api-key";
import { ap } from ".server/aws/db";
import {
  deleteZapierHookUrl,
  saveZapierHookUrl,
} from ".server/npo-integrations";

interface Item {
  id: string;
  date: string;
  recipient_id: number;
  recipient_name: string;
  amount: number;
  amount_usd: number;
  currency: string;
  donor_name: string;
  donor_email: string;
  program_id?: string;
  program_name?: string;
  payment_method: string;
  is_recurring: boolean;
  donor_company?: string;
}

//get all recent donations
export const loader: LoaderFunction = async ({ request }) => {
  const result = await validateApiKey(request.headers.get("x-api-key"));
  if (isResponse(result)) return result;
  const { npoId, env } = result;
  const dondb = new DonationsDb(ap, env);
  const page1 = await dondb.list_to_npo(npoId, { limit: 3 });
  const items = page1.items.map((i) => {
    const pm =
      i.paymentMethod || (i.chainId === "fiat" ? i.fiatRamp : i.chainName);
    const x: Item = {
      id: i.transactionId || "",
      date: i.transactionDate || "",
      recipient_id: i.endowmentId || 0,
      recipient_name: i.charityName || "",
      amount: i.amount || 0,
      amount_usd: i.usdValue || 0, //should be defined for finalized records
      currency: i.denomination || "",
      donor_name: i.fullName || "",
      donor_email: i.email || "",
      program_id: i.programId || "",
      program_name: i.programName || "",
      payment_method: pm || "",
      is_recurring: i.isRecurring ?? false,
      donor_company: i.company_name,
    };
    return x;
  });
  return new Response(JSON.stringify(items), { status: 200 });
};

export const action: ActionFunction = async ({ request }) => {
  const result = await validateApiKey(request.headers.get("x-api-key"));
  if (isResponse(result)) return result;

  const { npoId, env } = result;
  const data = await request.json();

  //subscribe
  if (request.method === "POST") {
    const id = await saveZapierHookUrl(data.hookUrl, npoId, env);
    return new Response(JSON.stringify({ id }), { status: 200 });
  }

  //unsubscribe
  if (request.method === "DELETE") {
    await deleteZapierHookUrl(data.id, npoId, env);
    return new Response(null, { status: 200 });
  }

  return new Response(null, { status: 405 });
};
