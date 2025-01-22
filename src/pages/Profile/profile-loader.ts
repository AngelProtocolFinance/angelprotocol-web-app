import type { LoaderFunctionArgs } from "@vercel/remix";
import { getEndow } from "api/get/endow";

export const profileLoader = async ({ params }: LoaderFunctionArgs) =>
  getEndow(params.id);
