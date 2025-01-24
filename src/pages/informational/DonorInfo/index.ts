import type { LoaderFunction, MetaFunction } from "@vercel/remix";
import { metas } from "helpers/seo";
import { getNpos } from ".server/npos";

export { default } from "./DonorInfo";

export const meta: MetaFunction = () =>
  metas({
    title: "For Donors",
    description:
      "Easily support grassroots organizations all over the world with card, crypto, stock, and DAF gifts that keep on giving. As a nonprofit, we charge no platform fees.",
  });

export const loader: LoaderFunction = async () => {
  const page = await getNpos({ page: 1, claimed: [true], query: "" });
  return page;
};
