import Liquid from "./Summary";
import { RouteComponentProps } from "react-router-dom";
import { RouteParam } from "./types";
import TransactionList from "./TransactionList";
import { useSetModal } from "components/Nodal/Nodal";
import Withdrawer from "components/Withdraw/Withdrawer";
import WithdrawSuite from "components/TransactionSuite/WithdrawSuite";
import { useExchangeRate } from "services/terra/vaults/queriers";
import { useEndowmentHoldings } from "services/terra/queriers";
import useProfile from "pages/Market/useProfile";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import PageMeta from "./PageMeta";

export default function Withdraw(props: RouteComponentProps<RouteParam>) {
  const wallet = useConnectedWallet();
  //fetch exchange rate here
  useExchangeRate();
  const address = props.match.params.address;
  const profile = useProfile(address);
  const { holdings } = useEndowmentHoldings(address, profile.is_placeholder);

  const is_owner = profile.charity_owner === wallet?.walletAddress;

  const { showModal } = useSetModal();
  function openWithdrawForm() {
    showModal(WithdrawModal, {
      address: address,
    });
  }

  return (
    <div className="grid grid-cols-2 gap-4 content-start padded-container justify-center">
      <PageMeta address={address} />
      <Liquid
        type="liquid"
        holdings={holdings.liquid_cw20}
        opener={openWithdrawForm}
        isOwner={is_owner}
      />
      <Liquid type="locked" holdings={holdings.locked_cw20} />
      <TransactionList address={address} />
    </div>
  );
}

type WithdrawProps = { address: string };

function WithdrawModal(props: WithdrawProps) {
  return (
    <Withdrawer account_addr={props.address}>
      <WithdrawSuite inModal />
    </Withdrawer>
  );
}
