import type { LoaderFunction } from "react-router";
import { anvil } from ".server/sdks";

export const loader: LoaderFunction = async ({ params: { eid } }) => {
  if (!eid) return new Response("missing doc eid", { status: 404 });

  const { data, statusCode } = await anvil.downloadDocuments(eid, {
    dataType: "stream",
  });

  return new Response(data, {
    status: statusCode,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="bettergiving-fs-ga.zip"`,
    },
  });
};
