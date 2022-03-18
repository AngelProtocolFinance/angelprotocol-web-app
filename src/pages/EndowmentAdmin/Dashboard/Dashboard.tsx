import { useEndowmentHoldings } from "services/terra/account/queriers";
import { useApprovedVaultsRate } from "services/terra/registrar/queriers";
import useWithdrawer from "components/Transactors/Withdrawer/useWithdrawer";
import PageMeta from "./PageMeta";
import Liquid from "./Summary";
import TransactionList from "./TransactionList";

export default function Dashboard(props: { endowmentAddr: string }) {
  //fetch exchange rate here
  useApprovedVaultsRate();
  const showWithdraw = useWithdrawer(props.endowmentAddr);
  const { holdings } = useEndowmentHoldings(props.endowmentAddr);

  return (
    <div className="grid grid-cols-2 gap-3 content-start justify-center relative">
      <PageMeta address={props.endowmentAddr} />
      <Liquid
        type="liquid"
        holdings={holdings.liquid_cw20}
        opener={showWithdraw}
      />
      <Liquid type="locked" holdings={holdings.locked_cw20} />
      <TransactionList endowmentAddress={props.endowmentAddr} />
    </div>
  );
}
