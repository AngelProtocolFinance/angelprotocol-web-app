import type { Endow } from "@better-giving/endowment";
import type { LoaderFunction } from "@vercel/remix";
import { getEndow } from "api/get/endow";
import { endowUpdate } from "../endow-update-action";

export interface LoaderData extends Endow {
  origin: string;
}

export const loader: LoaderFunction = async ({ params, request }) =>
  getEndow(params.id).then((d) => ({
    ...d,
    origin: new URL(request.url).origin,
  }));
export const action = endowUpdate({ success: "Profile updated" });
