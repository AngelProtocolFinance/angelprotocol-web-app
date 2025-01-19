import type { ClientLoaderFunction } from "@remix-run/react";
import { cacheClientLoader, useCachedLoaderData } from "remix-client-cache";
import type { DonationsPage } from "types/aws";
import DonationsTable from "./DonationsTable";
export const clientLoader: ClientLoaderFunction = (args) =>
  cacheClientLoader(args);
clientLoader.hydrate = true;

export default function Donations() {
  const page1 = useCachedLoaderData() as DonationsPage;
  return (
    <div>
      <h2 className="text-[2rem] font-bold mb-4">Donations</h2>
      <DonationsTable firstPage={page1} />
    </div>
  );
}
