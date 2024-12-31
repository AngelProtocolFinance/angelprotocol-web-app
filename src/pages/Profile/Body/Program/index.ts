import { getProgram } from "api/get/program";
import type { LoaderFunction } from "react-router";
export { default } from "./Program";
export const clientLoader: LoaderFunction = ({ params }) =>
  getProgram(params.id, params.programId);
