import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useGetter, useSetter } from "store/accessors";
import { useWallet } from "use-wallet";
import { useSetModal } from "components/Nodal/Nodal";
import { setPending } from "services/wallet/walletSlice";
import Result, { Props as ResProps } from "components/Popup/Result";
import displayEthError from "./displayEthError";

export default function useWaiter() {
  const { pending_tx } = useGetter((state) => state.wallet);
  const dispatch = useSetter();
  const wallet = useWallet();
  const { showModal } = useSetModal();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        if (wallet && pending_tx) {
          setLoading(true);
          const provider = new ethers.providers.Web3Provider(wallet.ethereum);
          const tx = await provider.getTransaction(pending_tx.hash);
          const receipt = await tx.wait();
          showModal<ResProps>(Result, {
            desc: "Thank you for your donation!",
            url: `https://ropsten.etherscan.io/tx/${receipt.transactionHash}`,
          });
          dispatch(setPending(null));
        }
      } catch (err) {
        displayEthError(err, showModal);
      } finally {
        setLoading(false);
      }
    })();
    //eslint-disable-next-line
  }, [pending_tx]);

  return { loading, pending_tx };
}
