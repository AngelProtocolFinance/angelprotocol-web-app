import { adminRoutes } from "constants/routes";
import Seo from "../Seo";
import DonationsTable from "./DonationsTable";

export default function Donations() {
  return (
    <div>
      <Seo title="Donations" url={adminRoutes.donations} />
      <h2 className="text-[2rem] font-bold mb-4">Donations</h2>
      <DonationsTable />
    </div>
  );
}
