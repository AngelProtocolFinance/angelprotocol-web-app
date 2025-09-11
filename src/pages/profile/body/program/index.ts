import { program_id } from "@better-giving/endowment/schema";
import { richTextStyles } from "components/rich-text";
import type { LinksFunction, LoaderFunction } from "react-router";
import { parse } from "valibot";
import { npoId } from "../common/npo-id";
import { npodb } from ".server/aws/db";
export { default } from "./program";
export { ErrorBoundary } from "components/error";
export const loader: LoaderFunction = async ({ params }) => {
  const pid = parse(program_id, params.programId);
  const id = await npoId(params.id);
  if (typeof id !== "number") return id;
  return npodb.npo_program(pid, id);
};
export const links: LinksFunction = () => [...richTextStyles];
