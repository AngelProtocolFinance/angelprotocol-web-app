import { useConnectedWallet } from "@terra-money/wallet-provider";
import { RouteComponentProps } from "react-router-dom";
import { useExchangeRate } from "services/terra/vaults/queriers";
import { useEndowmentHoldings } from "services/terra/account/queriers";
import { useProfile } from "services/aws/endowments/queriers";
import useWithdraw from "components/Transactors/Withdraw/useWithdraw";
import PageMeta from "./PageMeta";
import Liquid from "./Summary";
import { RouteParam } from "./types";
import TransactionList from "./TransactionList";

export default function Endowment(props: RouteComponentProps<RouteParam>) {
  const address = props.match.params.address;
  const wallet = useConnectedWallet();
  //fetch exchange rate here
  useExchangeRate();
  const showWithdraw = useWithdraw(address);
  const { profile } = useProfile(address);
  const { holdings } = useEndowmentHoldings(address, profile.is_placeholder);
  const is_owner = profile.charity_owner === wallet?.walletAddress;

  return (
    <div className="grid grid-cols-2 gap-4 content-start padded-container justify-center">
      <PageMeta address={address} />
      <Liquid
        type="liquid"
        holdings={holdings.liquid_cw20}
        opener={showWithdraw}
        isOwner={is_owner}
      />
      <Liquid type="locked" holdings={holdings.locked_cw20} />
      <TransactionList address={address} />
    </div>
  );
}
