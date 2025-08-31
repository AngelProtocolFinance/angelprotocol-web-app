import { useLoaderData } from "react-router";
import type { DonationsPage } from "types/donations";
import DonationsTable from "./donations-table";
export { ErrorBoundary } from "components/error";
export { loader } from "./api";
export default function Donations() {
  const page1 = useLoaderData() as DonationsPage;
  return (
    <div>
      <h2 className="text-[2rem] font-bold mb-4">Donations</h2>
      <DonationsTable page1={page1} />
    </div>
  );
}
