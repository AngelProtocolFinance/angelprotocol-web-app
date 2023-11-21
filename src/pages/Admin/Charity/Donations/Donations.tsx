import { adminRoutes } from "constants/routes";
import Seo from "../Seo";
import DonationsTable from "./DonationsTable";

export default function Contributions() {
  return (
    <div>
      <Seo title="Contributions" url={adminRoutes.donations} />

      <h2 className="text-[2rem] font-bold mb-10">Donations</h2>
      <DonationsTable />
    </div>
  );
}
