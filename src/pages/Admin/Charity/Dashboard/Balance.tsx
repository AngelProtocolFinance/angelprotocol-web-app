import { AccountType } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import Holdings from "../Holdings";
import { accountTypeDisplayValue } from "../constants";

type Props = { type: AccountType };
export default function Balance({ type }: Props) {
  const { details } = useAdminResources<"charity">();

  return (
    <div className="rounded p-3 border border-prim bg-orange-l6 dark:bg-blue-d6">
      <h4 className="uppercase font-extrabold">
        {accountTypeDisplayValue[type]}
      </h4>

      <Holdings {...details[type].balance} type={type} />
    </div>
  );
}
