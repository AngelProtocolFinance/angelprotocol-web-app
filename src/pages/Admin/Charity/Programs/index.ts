import { getPrograms } from "api/get/programs";
import type { LoaderFunction } from "react-router-dom";

export { default as Component } from "./Programs";

export const loader: LoaderFunction = async ({ params }) =>
  getPrograms(params.id);
