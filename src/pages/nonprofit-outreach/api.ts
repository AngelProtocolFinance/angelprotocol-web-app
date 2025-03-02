import type { LoaderFunction } from "@vercel/remix";
import { nonprofits } from ".server/mongodb/db";

export const loader: LoaderFunction = async ({ request }) => {
  const items = await nonprofits
    .find({})
    .sort({ assets: -1 })
    // .skip(skip)
    .limit(5)
    .toArray()
    .then((x) => x.map((x) => ({ ...x, _id: x._id.toString() })));

  return items;
};
