import type { LoaderFunction } from "@remix-run/react";
import { getProgram } from "api/get/program";
export { default } from "./Program";
export const clientLoader: LoaderFunction = ({ params }) =>
  getProgram(params.id, params.programId);
