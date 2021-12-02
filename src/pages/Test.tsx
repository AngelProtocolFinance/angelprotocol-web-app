import { useConnectedWallet } from "@terra-money/wallet-provider";
import AppHead from "components/Headers/AppHead";
import Poller from "components/Poller/Poller";
import PollerForm from "components/Poller/PollerForm";
// import StakeForm from "components/StakeForm/StakeForm";
// import Staker from "components/Staker/Staker";
import Halo from "contracts/Halo";
import { useEffect } from "react";
import { useGovStateQuery } from "services/terra/terra";

export default function Test() {
  const wallet = useConnectedWallet();
  useGovStateQuery({
    address: "terra1l8aj2jvjsz3whqyvt0hz5fvf3vhd8gcrxf6r56",
    msg: { state: {} },
  });

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
      {/* <Staker>
        <StakeForm />
      </Staker> */}

      <Poller>
        <PollerForm />
      </Poller>
    </div>
  );
}
