import type { LoaderFunction } from "@vercel/remix";
import { nonprofits } from ".server/mongodb/db";

export const loader: LoaderFunction = async ({ params }) => {
  const type = params.type;
  if (!type)
    return new Response("aggregate type not specified", { status: 400 });
  //return unique state
  console.log(type);
  const states = await nonprofits
    .distinct(type)
    .then((s) => s.filter((x) => x != null));
  return new Response(JSON.stringify(states));
};
