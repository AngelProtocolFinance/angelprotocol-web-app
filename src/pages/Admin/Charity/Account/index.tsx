import { AccountType } from "types/lists";
import { titleCase } from "constants/common";
import { adminRoutes } from "constants/routes";
import Seo from "../Seo";
import Balances from "./Balances";
import Positions from "./Positions";

export default function Account({ type }: { type: AccountType }) {
  return (
    <div>
      <Seo
        title={`${titleCase(type)} Account`}
        url={`${adminRoutes.account}/${type}`}
      />
      <h2 className="font-bold text-[2rem] capitalize mb-8 max-sm:text-center">
        {type} Account
      </h2>
      <h5 className="text-2xl font-bold mb-8 max-sm:text-center">Overview</h5>
      <Balances type={type} />
      <h5 className="text-2xl font-bold my-8 capitalize">{type} Positions</h5>
      <Positions type={type} />
    </div>
  );
}
