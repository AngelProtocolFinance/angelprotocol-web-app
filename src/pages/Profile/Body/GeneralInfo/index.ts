import { getPrograms } from "api/get/programs";
import type { LoaderFunction } from "react-router";
import { featuredMedia } from "../featured-media";

export { default } from "./GeneralInfo";
export const clientLoader: LoaderFunction = async ({ params }) =>
  Promise.all([getPrograms(params.id), featuredMedia(params.id)]);
