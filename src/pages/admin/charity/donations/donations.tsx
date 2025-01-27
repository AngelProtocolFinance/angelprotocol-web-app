import { useCachedLoaderData } from "api/cache";
import type { DonationsPage } from "types/aws";
import DonationsTable from "./donations-table";
export { ErrorBoundary } from "components/error";
export { loader } from "./api";
export { clientLoader } from "api/cache";
export default function Donations() {
  const page1 = useCachedLoaderData() as DonationsPage;
  return (
    <div>
      <h2 className="text-[2rem] font-bold mb-4">Donations</h2>
      <DonationsTable firstPage={page1} />
    </div>
  );
}
