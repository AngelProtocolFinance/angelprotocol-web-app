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
import { useConnectedWallet } from "@terra-dev/use-wallet";

export default function Withdraw(props: RouteComponentProps<RouteParam>) {
  const wallet = useConnectedWallet();
  //fetch exchange rate here
  useExchangeRate();
  const address = props.match.params.address;
  const profile = useProfile(address);
  const holdings = useEndowmentHoldings(address, profile.is_placeholder);

  const is_owner = profile.charity_owner === wallet?.walletAddress;

  const { showModal } = useSetModal();
  function openWithdrawForm() {
    showModal(WithdrawModal, {
      address: address,
    });
  }

  return (
    <div className="grid content-start">
      <div className="padded-container justify-center">
        <div className="mt-0 md:mt-8 mx-auto w-auto text-white-grey">
          <div className="grid gap-4 sm:grid-cols-2">
            <Liquid
              type="liquid"
              holdings={holdings.liquid_cw20}
              opener={openWithdrawForm}
              isOwner={is_owner}
            />
            <Liquid type="locked" holdings={holdings.locked_cw20} />
          </div>
        </div>
        <div className="self-start mb-6 mt-4 w-full font-heading">
          <TransactionList address={address} />
        </div>
      </div>
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
