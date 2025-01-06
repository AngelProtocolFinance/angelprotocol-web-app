import type { LoaderFunction } from "@remix-run/node";
import { getProgram } from "api/get/program";
export { default } from "./Program";
export const loader: LoaderFunction = ({ params }) =>
  getProgram(params.id, params.programId);
