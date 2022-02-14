import Liquid from "./Summary";
import { RouteComponentProps } from "react-router-dom";
import { RouteParam } from "./types";
import TransactionList from "./TransactionList";
import { useExchangeRate } from "services/terra/vaults/queriers";
import { useEndowmentHoldings } from "services/terra/account/queriers";
import { useProfile } from "services/aws/endowments/queriers";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import PageMeta from "./PageMeta";
import useWithdrawer from "components/Withdrawer/useWithdrawer";

export default function Withdraw(props: RouteComponentProps<RouteParam>) {
  const address = props.match.params.address;
  const wallet = useConnectedWallet();
  //fetch exchange rate here
  useExchangeRate();
  const showWithdrawer = useWithdrawer(address);
  const { profile } = useProfile(address);
  const { holdings } = useEndowmentHoldings(address, profile.is_placeholder);
  const is_owner = profile.charity_owner === wallet?.walletAddress;

  return (
    <div className="grid grid-cols-2 gap-4 content-start padded-container justify-center">
      <PageMeta address={address} />
      <Liquid
        type="liquid"
        holdings={holdings.liquid_cw20}
        opener={showWithdrawer}
        isOwner={is_owner}
      />
      <Liquid type="locked" holdings={holdings.locked_cw20} />
      <TransactionList address={address} />
    </div>
  );
}
