import type { LoaderFunction } from "react-router";
import { get_npos } from ".server/npos";

export const loader: LoaderFunction = async () => {
  const page = await get_npos({
    page: 1,
    claimed: [true],
    published: [true],
    query: "",
  });
  return page;
};
