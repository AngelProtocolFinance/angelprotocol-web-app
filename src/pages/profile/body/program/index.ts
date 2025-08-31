import { getProgram } from "api/get/program";
import { richTextStyles } from "components/rich-text";
import type { LinksFunction, LoaderFunction } from "react-router";
import { npoId } from "../common/npo-id";
export { default } from "./program";
export { ErrorBoundary } from "components/error";
export const loader: LoaderFunction = async ({ params }) => {
  const id = await npoId(params.id);
  if (typeof id !== "number") return id;

  return getProgram(id, params.programId);
};
export const links: LinksFunction = () => [...richTextStyles];
