import type { LinksFunction, LoaderFunction } from "@vercel/remix";
import { getProgram } from "api/get/program";
import { richTextStyles } from "components/RichText";
export { default } from "./Program";
export const loader: LoaderFunction = ({ params }) =>
  getProgram(params.id, params.programId);

export const links: LinksFunction = () => [...richTextStyles];
