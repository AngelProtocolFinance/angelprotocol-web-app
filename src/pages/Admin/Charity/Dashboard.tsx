import useWithdrawer from "pages/Admin/charity/Withdrawer/useWithdrawer";
import { useAdminResources } from "../Guard";
import Summary from "./Summary";
import Transactions from "./Transactions";

export default function Dashboard() {
  const { endowment } = useAdminResources();
  const showWithdraw = useWithdrawer(endowment);

  return (
    <div className="grid grid-cols-2 gap-3 content-start justify-center">
      <Summary
        type="liquid"
        balance={0}
        opener={showWithdraw}
        isOwner={false}
      />
      <Summary type="locked" balance={0} />
      <Transactions endowmentAddress={endowment} />
    </div>
  );
}
