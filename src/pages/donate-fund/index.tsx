import { ap, ver } from "api/api";
import type { LoaderFunction } from "react-router";

export { default } from "./content";
export const clientLoader: LoaderFunction = async ({ params }) => {
  return ap.get(`${ver(1)}/funds/${params.fundId}`).json();
};
