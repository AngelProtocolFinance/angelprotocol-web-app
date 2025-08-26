import { plusInt } from "api/schema/endow-id";
import type { ActionFunction, LoaderFunction } from "react-router";
import { parse } from "valibot";
import { env } from ".server/env";
import {
  generateZapierApiKey,
  getZapierApiKey,
} from ".server/npo-integrations";

export const action: ActionFunction = async ({ params }) => {
  const id = parse(plusInt, params.id);
  const apiKey = await generateZapierApiKey(id);
  return { apiKey };
};

export interface LoaderData {
  apiKey: string | undefined;
}

export const loader: LoaderFunction = async ({ params }) => {
  const id = parse(plusInt, params.id);
  const apiKey = await getZapierApiKey(id, env);
  return { apiKey };
};
