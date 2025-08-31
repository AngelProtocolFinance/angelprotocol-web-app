import type { Endow } from "@better-giving/endowment";
import { getEndow } from "api/get/endow";
import type { LoaderFunction } from "react-router";
import { endowUpdate } from "../endow-update-action";

export interface LoaderData extends Endow {
  base_url: string;
}

export const loader: LoaderFunction = async ({ params, request }) =>
  getEndow(params.id).then((d) => ({
    ...d,
    base_url: new URL(request.url).origin,
  }));
export const action = endowUpdate({ success: "Profile updated" });
