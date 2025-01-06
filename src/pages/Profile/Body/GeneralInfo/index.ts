import type { LoaderFunction } from "@remix-run/node";
import { getPrograms } from "api/get/programs";
import { featuredMedia } from "../featured-media";

export { default } from "./GeneralInfo";
export const loader: LoaderFunction = async ({ params }) =>
  Promise.all([getPrograms(params.id), featuredMedia(params.id)]);
