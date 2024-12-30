import { getEndow } from "api/get/endow";
import type { LoaderFunctionArgs } from "react-router";

export const profileLoader = async ({ params }: LoaderFunctionArgs) =>
  getEndow(params.id);
