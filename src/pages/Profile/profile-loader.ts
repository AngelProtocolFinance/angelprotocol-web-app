import type { LoaderFunctionArgs } from "@remix-run/react";
import { getEndow } from "api/get/endow";

export const profileLoader = async ({ params }: LoaderFunctionArgs) =>
  getEndow(params.id);
