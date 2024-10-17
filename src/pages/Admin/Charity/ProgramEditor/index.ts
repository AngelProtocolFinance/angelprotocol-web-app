import { getProgram } from "api/get/program";
import type { LoaderFunction } from "react-router-dom";

export { default as Component } from "./ProgramEditor";

export const loader: LoaderFunction = async ({ params }) =>
  getProgram(params.id, params.programId);
