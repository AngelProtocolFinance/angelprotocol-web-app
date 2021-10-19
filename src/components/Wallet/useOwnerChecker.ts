import { useEffect, useState } from "react";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { chains } from "contracts/types";
import Account from "contracts/Account";

export default function useOwnerChecker() {
  const [isCharityOwner, setCharityOwner] = useState(false);
  const wallet = useConnectedWallet();
  const accountAddr =
    wallet?.network.chainID === chains.testnet
      ? "terra1grjzys0n9n9h9ytkwjsjv5mdhz7dzurdsmrj4v"
      : "terra12crxq8nxml96e9h38fe67c4p76pc24l54zjzzh";

  useEffect(() => {
    (async () => {
      try {
        if (!wallet) {
          setCharityOwner(false);
          return;
        }

        const account = new Account(accountAddr, wallet);
        const accountDetails = await account.getDetails();
        if (accountDetails.owner === wallet.walletAddress) {
          setCharityOwner(true);
        }
      } catch (err) {
        console.error(err);
        setCharityOwner(false);
      }
    })();
  }, [wallet]);

  return { isCharityOwner };
}
