import { useLoaderData } from "react-router-dom";
import type { DonationsPage } from "types/aws";
import DonationsTable from "./DonationsTable";

export default function Donations() {
  const page1 = useLoaderData() as DonationsPage;
  return (
    <div>
      <h2 className="text-[2rem] font-bold mb-4">Donations</h2>
      <DonationsTable firstPage={page1} />
    </div>
  );
}
