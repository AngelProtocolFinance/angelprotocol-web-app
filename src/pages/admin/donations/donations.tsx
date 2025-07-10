import { useCachedLoaderData } from "api/cache";
import type { DonationsPage } from "types/donations";
import DonationsTable from "./donations-table";
import { Schedule } from "./schedule";
export { ErrorBoundary } from "components/error";
export { loader } from "./api";
export { clientLoader } from "api/cache";
export default function Donations() {
  const page1 = useCachedLoaderData() as DonationsPage;
  return (
    <div>
      <h2 className="text-[2rem] font-bold mb-4">Donations</h2>
      <Schedule
        classes="mb-4"
        amount={100}
        allocation={{
          cash: 50,
          liq: 30,
          lock: 20,
        }}
      />
      <DonationsTable page1={page1} />
    </div>
  );
}
