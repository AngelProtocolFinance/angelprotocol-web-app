import type { ActionFunction, LoaderFunction } from "@vercel/remix";
import { isResponse, validateApiKey } from "./helpers/validate-api-key";
import { get_donations } from ".server/donations";
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
  const page1 = await get_donations({ asker: npoId, limit: 3 }, env);
  const items = page1.items.map((i) => {
    const x: Item = {
      id: i.id,
      date: i.date,
      recipient_id: i.recipient_id,
      recipient_name: i.recipient_name,
      amount: i.init_amount,
      amount_usd: i.final_amount_usd!, //should be defined for finalized records
      currency: i.symbol,
      donor_name: i.donor_details?.full_name ?? "Anonymous",
      donor_email: i.donor_id,
      program_id: i.program_id,
      program_name: i.program_name,
      payment_method: i.payment_method || i.via_name,
      is_recurring: i.is_recurring ?? false,
      donor_company: i.donor_details?.company,
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
