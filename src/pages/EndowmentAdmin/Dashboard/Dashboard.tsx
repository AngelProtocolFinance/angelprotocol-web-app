import { useEndowmentHoldings } from "services/terra/account/queriers";
import { useMemberState } from "services/terra/admin/states";
import { useApprovedVaultsRate } from "services/terra/registrar/queriers";
import useWithdrawer from "components/Transactors/Withdrawer/useWithdrawer";
import PageMeta from "./PageMeta";
import Summary from "./Summary";
import Transactions from "./Transactions";

export default function Dashboard(props: { endowmentAddr: string }) {
  //fetch exchange rate here
  useApprovedVaultsRate();
  const { member } = useMemberState();
  const showWithdraw = useWithdrawer(props.endowmentAddr);
  const { holdings } = useEndowmentHoldings(props.endowmentAddr);

  return (
    <div className="grid grid-cols-2 gap-3 content-start justify-center relative">
      <PageMeta address={props.endowmentAddr} />
      <Summary
        type="liquid"
        holdings={holdings.liquid_cw20}
        opener={showWithdraw}
        isOwner={!!member.weight}
      />
      <Summary type="locked" holdings={holdings.locked_cw20} />
      <Transactions endowmentAddress={props.endowmentAddr} />
    </div>
  );
}
