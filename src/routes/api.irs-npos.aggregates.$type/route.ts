import type { LoaderFunction } from "@vercel/remix";
import { distinctFilters } from "types/mongodb/nonprofits";
import { nonprofits } from ".server/mongodb/db";

export const loader: LoaderFunction = async ({ params }) => {
  const type = params.type;
  if (!type)
    return new Response("aggregate type not specified", { status: 400 });
  //return unique state
  if (type in distinctFilters) {
    const states = await nonprofits
      .distinct(distinctFilters[type as keyof typeof distinctFilters])
      .then((s) => s.filter((x) => x != null));
    return new Response(JSON.stringify(states));
  }
  return new Response(null, { status: 404 });
};
