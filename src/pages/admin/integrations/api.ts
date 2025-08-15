import { $int_gte1 } from "@better-giving/schemas";
import type { ActionFunction, LoaderFunction } from "@vercel/remix";
import { parse } from "valibot";
import { env } from ".server/env";
import {
  generateZapierApiKey,
  getZapierApiKey,
} from ".server/npo-integrations";

export const action: ActionFunction = async ({ params }) => {
  const id = parse($int_gte1, params.id);
  const apiKey = await generateZapierApiKey(id);
  return { apiKey };
};

export interface LoaderData {
  apiKey: string | undefined;
}

export const loader: LoaderFunction = async ({ params }) => {
  const id = parse($int_gte1, params.id);
  const apiKey = await getZapierApiKey(id, env);
  return { apiKey };
};
