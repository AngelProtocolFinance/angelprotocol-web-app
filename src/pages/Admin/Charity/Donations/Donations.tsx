import { useLoaderData } from "react-router-dom";
import DonationsTable from "./DonationsTable";
import type { Page } from "./types";

export default function Donations() {
  const page1 = useLoaderData() as Page;
  return (
    <div>
      <h2 className="text-[2rem] font-bold mb-4">Donations</h2>
      <DonationsTable firstPage={page1} />
    </div>
  );
}
