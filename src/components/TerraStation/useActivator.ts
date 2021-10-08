import { WalletStatus } from "@terra-money/wallet-provider";
import { Wallets } from "components/WalletSuite/types";
import { useGetWallet, useSetWallet } from "components/WalletSuite/WalletSuite";
import { useEffect } from "react";

export default function useActivator(
  status: WalletStatus,
  thisWallet: Wallets
) {
  const { setActiveWallet } = useSetWallet();
  const { activeWallet, currWallet } = useGetWallet();

  useEffect(() => {
    //TODO: unify activeWallet description for terra station & mobile since
    //they react on the same status

    //on clean slate, connect if can,
    // if (
    //   status === WalletStatus.WALLET_CONNECTED &&
    //   activeWallet === Wallets.none &&
    //   currWallet === Wallets.none
    // ) {
    //   setActiveWallet(thisWallet);
    // }

    //on connect, set this active if not active yet
    if (
      status === WalletStatus.WALLET_CONNECTED &&
      activeWallet !== thisWallet &&
      currWallet === thisWallet
    ) {
      setActiveWallet(currWallet);
    }

    //on disconnect, deactivate this if this is the active wallet
    if (
      status === WalletStatus.WALLET_NOT_CONNECTED &&
      activeWallet === thisWallet
    ) {
      setActiveWallet(Wallets.none);
    }
  }, [status]);
}
