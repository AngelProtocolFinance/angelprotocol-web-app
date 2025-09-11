import { $int_gte1 } from "@better-giving/schemas";
import { parse } from "valibot";
import type { Route } from "./+types";
import { env } from ".server/env";
import {
  generateZapierApiKey,
  getZapierApiKey,
} from ".server/npo-integrations";

export const action = async ({ params }: Route.ActionArgs) => {
  const id = parse($int_gte1, params.id);
  const apiKey = await generateZapierApiKey(id);
  return { apiKey };
};

export interface LoaderData {
  apiKey: string | undefined;
}

export const loader = async ({ params }: Route.LoaderArgs) => {
  const id = parse($int_gte1, params.id);
  const apiKey = await getZapierApiKey(id, env);
  return { apiKey };
};
