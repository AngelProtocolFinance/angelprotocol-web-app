import { adminRoutes } from "constant/routes";
import Seo from "../Seo";
import Balances from "../common/Balances";
import Strategies from "./Strategies";
import Transactions from "./Transactions";

export default function Invest() {
  return (
    <div>
      <Seo title="Invest Dashboard" url={adminRoutes.invest} />

      <h3 className="font-bold text-[2rem] mb-8 max-sm:text-center">
        Invest Dashboard
      </h3>
      <Balances />
      <Transactions />
      <Strategies />
    </div>
  );
}
