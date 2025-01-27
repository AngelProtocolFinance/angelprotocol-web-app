import type { LinksFunction, LoaderFunction } from "@vercel/remix";
import { getProgram } from "api/get/program";
import { richTextStyles } from "components/rich-text";
export { default } from "./program";
export { ErrorBoundary } from "components/error";
export const loader: LoaderFunction = ({ params }) =>
  getProgram(params.id, params.programId);

export const links: LinksFunction = () => [...richTextStyles];
