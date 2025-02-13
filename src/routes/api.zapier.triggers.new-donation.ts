import type { ActionFunction, LoaderFunction } from "@vercel/remix";
import { isResponse, validateApiKey } from "./helpers/validate-api-key";
import { getDonations } from ".server/donations";
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
}

//get all recent donations
export const loader: LoaderFunction = async ({ request }) => {
  const result = await validateApiKey(request.headers.get("x-api-key"));
  if (isResponse(result)) return result;
  const { npoId } = result;
  const page1 = await getDonations({ asker: npoId, limit: 3 });
  const items = page1.Items.map((i) => {
    const x: Item = {
      id: i.id,
      date: i.date,
      recipient_id: i.recipientId,
      recipient_name: i.recipientName,
      amount: i.initAmount,
      amount_usd: i.finalAmountUsd!, //should be defined for finalized records
      currency: i.symbol,
      donor_name: i.donorDetails?.fullName ?? "Anonymous",
      donor_email: i.donorId,
      program_id: i.programId,
      program_name: i.programName,
      payment_method: i.paymentMethod || i.viaName,
      is_recurring: i.isRecurring ?? false,
    };
    return x;
  });
  return new Response(JSON.stringify(items), { status: 200 });
};

export const action: ActionFunction = async ({ request }) => {
  const result = await validateApiKey(request.headers.get("x-api-key"));
  if (isResponse(result)) return result;

  const { npoId } = result;
  const data = await request.json();

  //subscribe
  if (request.method === "POST") {
    const id = await saveZapierHookUrl(data.hookUrl, npoId);
    return new Response(JSON.stringify({ id }), { status: 200 });
  }

  //unsubscribe
  if (request.method === "DELETE") {
    await deleteZapierHookUrl(data.id, npoId);
    return new Response(null, { status: 200 });
  }

  return new Response(null, { status: 405 });
};
