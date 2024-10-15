import Seo from "components/Seo";
import { adminRoutes } from "constants/routes";
import { useLoaderData } from "react-router-dom";
import DonationsTable from "./DonationsTable";
import type { Page } from "./types";

export default function Donations() {
  const page1 = useLoaderData() as Page;
  return (
    <div>
      <Seo title="Donations" url={adminRoutes.donations} />
      <h2 className="text-[2rem] font-bold mb-4">Donations</h2>
      <DonationsTable firstPage={page1} />
    </div>
  );
}
