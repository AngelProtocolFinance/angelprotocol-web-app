import Claimer from "components/Claimer/Claimer";
import { useSetModal } from "components/Nodal/Nodal";
import Staker from "components/Staker/Staker";
import Swapper from "components/Swapper/Swapper";
import ClaimSuite from "components/TransactionSuite/ClaimSuite";
import StakeSuite from "components/TransactionSuite/StakeSuite";
import SwapSuite from "components/TransactionSuite/SwapSuite";
import { currency_icons, denoms } from "constants/currency";
import { useHistory } from "react-router-dom";
import { useGovStaker } from "services/terra/hooks";
import "./Portal.css";

export default function Portal() {
  const { showModal } = useSetModal();
  const history = useHistory();
  const gov_staker = useGovStaker();

  function showStaker() {
    showModal(StakeModal, {});
  }

  function showUnstaker() {
    showModal(UnstakeModal, {});
  }

  function showClaimer() {
    showModal(ClaimModal, {});
  }

  function showSwapper() {
    showModal(SwapModal, { inModal: true });
  }

  const hasStake = +gov_staker.balance > 0;
  console.log(gov_staker);

  return (
    <div className="bg-white bg-opacity-10 border border-opacity-10 shadow-xl w-full col-start-2 row-span-2 rounded-md p-2 p-8 pb-6 grid grid-rows-a1">
      <div className="flex flex-wrap gap-2 items-center mb-10 lg:mb-0">
        <div className="relative">
          <div className="absolute w-full h-full border-4 border-white border-opacity-80 rounded-full animate-pulse shadow-md"></div>
          <img
            src={currency_icons[denoms.uhalo]}
            alt=""
            className="w-14 h-14 m-2 opacity-90 shadow-lg rounded-full"
          />
        </div>
        <span className="text-6xl text-white-grey font-bold -mr-1">HALO</span>
        <span className="sm:ml-auto text-3xl text-white-grey text-opacity-90">
          0.00% APR
        </span>
      </div>
      <div className="flex flex-wrap gap-2 justify-start md:justify-self-end self-end">
        <Action title="Trade Halo" action={showSwapper} />
        <Action title="Stake" action={showStaker} />
        <Action title="Unstake" action={showUnstaker} disabled={!hasStake} />
        <Action title="Claim" action={showClaimer} disabled={!hasStake} />
      </div>
    </div>
  );
}

type ActionProps = {
  title: string;
  action: () => void;
  disabled?: boolean;
};

function Action({ title, action, disabled = false }: ActionProps) {
  return (
    <button onClick={action} className="action-button" disabled={disabled}>
      {title}
    </button>
  );
}

function StakeModal() {
  return (
    <Staker stake>
      <StakeSuite inModal />
    </Staker>
  );
}

function UnstakeModal() {
  return (
    <Staker>
      <StakeSuite inModal />
    </Staker>
  );
}

function ClaimModal() {
  return (
    <Claimer>
      <ClaimSuite inModal />
    </Claimer>
  );
}

function SwapModal() {
  return (
    <Swapper>
      <SwapSuite inModal />
    </Swapper>
  );
}
