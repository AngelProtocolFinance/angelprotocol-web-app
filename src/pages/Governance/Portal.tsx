import { denoms } from "types/denoms";
import { useStakingAPRQuery } from "services/aws/governance";
import useClaimer from "components/Transactors/Claimer/useClaimer";
import useStaker from "components/Transactors/Staker/useStaker";
import useSwapper from "components/Transactors/Swapper/useSwapper";
import { currency_icons } from "constants/currency";
import Button from "./Button";

export default function Portal() {
  const { data } = useStakingAPRQuery(null);
  const showSwapper = useSwapper();
  const showStaker = useStaker();
  const showClaimer = useClaimer();

  return (
    <div className="bg-white/10 border border-white/10 shadow-xl w-full col-start-2 row-span-2 rounded-md p-6 pb-6 grid grid-rows-a1">
      <div className="flex flex-wrap gap-2 items-center mb-10 lg:mb-0">
        <div className="relative">
          <div className="absolute w-full h-full border-4 border-white/80 rounded-full animate-pulse shadow-md"></div>
          <img
            src={currency_icons[denoms.uhalo]}
            alt=""
            className="w-14 h-14 m-2 opacity-90 shadow-lg rounded-full"
          />
        </div>
        <span className="text-6xl text-white-grey font-bold -mr-1">HALO</span>
        <span className="sm:ml-auto text-3xl text-white-grey/90">
          {data && `${Number(data.stakingAPY).toFixed(2)}% APY`}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 self-end justify-end">
        <Button onClick={showSwapper}>Trade Halo</Button>
        <Button onClick={showStaker(true)}>Stake</Button>
        <Button onClick={showStaker(false)}>Unstake</Button>
        <Button onClick={showClaimer}>Claim</Button>
      </div>
    </div>
  );
}
