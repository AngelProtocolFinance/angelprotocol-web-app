import haloIcon from "assets/icons/currencies/halo_solid.png";
import { useSetModal } from "components/Nodal/Nodal";
import Staker from "components/Staker/Staker";
import StakeSuite from "components/TransactionSuite/StakeSuite";

export default function Portal() {
  const { showModal } = useSetModal();
  function showStaker() {
    showModal(StakeModal, {});
  }
  function showUnstaker() {
    showModal(UnstakeModal, {});
  }

  return (
    <div className="bg-white bg-opacity-10 border border-opacity-10 shadow-xl w-full col-start-2 row-span-2 rounded-md p-2 p-8 pb-6 grid grid-rows-a1">
      <div className="flex flex-wrap gap-2 items-center mb-10 lg:mb-0">
        <div className="relative">
          <div className="absolute w-full h-full border-4 border-white border-opacity-80 rounded-full animate-pulse shadow-md"></div>
          <img
            src={haloIcon}
            alt=""
            className="w-14 h-14 m-2 opacity-90 shadow-lg rounded-full"
          />
        </div>
        <span className="text-6xl text-white-grey font-bold -mr-1">HALO</span>
        <span className="sm:ml-auto text-3xl text-white-grey text-opacity-90">
          13.92% APR
        </span>
      </div>
      <div className="flex flex-wrap gap-2 justify-center md:justify-self-end self-end">
        <Action title="Trade Halo" action={() => {}} />
        <Action title="Stake" action={showStaker} />
        <Action title="Unstake" action={showUnstaker} />
      </div>
    </div>
  );
}

function Action(props: { title: string; action: () => void }) {
  return (
    <button
      onClick={props.action}
      className="font-heading text-sm text-white-grey bg-blue-accent hover:bg-angel-blue border-2 border-opacity-30 shadow-sm w-32 uppercase text-center pt-1.5 pb-1 mb-1 lg:mb:0 rounded-md"
    >
      {props.title}
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
