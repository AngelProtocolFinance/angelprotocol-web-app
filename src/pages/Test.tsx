import { useConnectedWallet } from "@terra-money/wallet-provider";
import AppHead from "components/Headers/AppHead";
import StakeForm from "components/StakeForm/StakeForm";
import Staker from "components/Staker/Staker";
import Halo from "contracts/Halo";
import { useEffect } from "react";

export default function Test() {
  const wallet = useConnectedWallet();
  //get staked balance
  useEffect(() => {
    const contract = new Halo(wallet);
    contract.getGovStaker().then((res) => {
      console.log(res);
    });
    contract.getGovState().then((res) => {
      console.log(res);
    });
  }, [wallet]);

  return (
    <div className="pb-16 grid grid-rows-a1 place-items-center">
      <AppHead />
      <Staker>
        <StakeForm />
      </Staker>
    </div>
  );
}
