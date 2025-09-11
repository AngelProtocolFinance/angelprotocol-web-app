import type { INpo } from "@better-giving/endowment";
import { $int_gte1 } from "@better-giving/schemas";
import { resp } from "helpers/https";
import type { LoaderFunctionArgs } from "react-router";
import { parse } from "valibot";
import { endowUpdate } from "../endow-update-action";
import { npodb } from ".server/aws/db";

export interface LoaderData extends INpo {
  base_url: string;
}

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const id = parse($int_gte1, params.id);
  const npo = await npodb.npo(id);
  if (!npo) throw resp.status(404);

  return {
    ...npo,
    base_url: new URL(request.url).origin,
  } satisfies LoaderData;
};

export const action = endowUpdate({ success: "Profile updated" });
