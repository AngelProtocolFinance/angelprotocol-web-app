// import Voter from "components/Voter/Voter";
// import VoterForm from "components/Voter/VoterForm";
// import { useGovStaker } from "services/terra/hooks";

import { useWallet } from "@terra-money/use-wallet";

export default function Test() {
  const wallet = useWallet();
  console.log("wallet", wallet);
  console.log("window", (window as any).xfi);
  console.log(wallet.network.chainID);
  return (
    <div className="grid grid-rows-a1 place-items-center">
      <h3>some test</h3>
    </div>
  );
}
