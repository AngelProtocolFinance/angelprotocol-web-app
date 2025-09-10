import type { LoaderFunction } from "@vercel/remix";
import { anvil } from ".server/sdks";

export const loader: LoaderFunction = async ({ params: { eid } }) => {
  if (!eid) return new Response("missing doc eid", { status: 404 });

  const { data, statusCode } = await anvil.downloadDocuments(eid, {
    dataType: "stream",
  });

  return new Response(data, {
    status: statusCode,
    headers: {
      "content-type": "application/zip",
      "content-disposition": `attachment; filename="bettergiving-fs-ga.zip"`,
    },
  });
};
