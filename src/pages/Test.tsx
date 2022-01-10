import { useConnectedWallet } from "@terra-money/wallet-provider";
import DappHead from "components/Headers/DappHead";
import Airdrop from "contracts/Airdrop";
import { useEffect } from "react";

export default function Test() {
  const wallet = useConnectedWallet();
  useEffect(() => {
    if (!wallet) return;
    (async () => {
      const contract = new Airdrop(wallet);
      const res = await contract.createClaimTx();
      console.log(res);
    })();
  }, [wallet]);

  return (
    <div className="grid grid-rows-a1 place-items-center">
      <DappHead />
      <h3>some test</h3>
    </div>
  );
}
