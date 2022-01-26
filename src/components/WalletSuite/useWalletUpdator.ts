import { useConnectedWallet } from "@terra-money/wallet-provider";
import { denoms } from "constants/currency";
import { chainIDs } from "contracts/types";
import useTerraBalance from "hooks/useTerraBalance";
import { useEffect } from "react";
import { Providers } from "services/provider/types";
import { TerraIdentifiers } from "services/wallet/types";
import { setIsUpdating, setWalletDetails } from "services/wallet/walletSlice";
import { useSetter } from "store/accessors";

export default function useWalletUpdator(activeProvider: Providers) {
  const dispatch = useSetter();
  const wallet = useConnectedWallet();
  const { main, others } = useTerraBalance(denoms.uusd);

  useEffect(() => {
    if (activeProvider !== Providers.terra) {
      return;
    }
    if (!wallet) {
      return;
    }

    if (
      //only run this updator when wallet is terra extension or wallet connect
      !(
        wallet.connection.identifier === TerraIdentifiers.station ||
        wallet.connection.identifier === undefined
      )
    ) {
      return;
    }

    dispatch(setIsUpdating(true));
    dispatch(
      setWalletDetails({
        icon: wallet.connection.icon,
        displayCoin: { amount: main, denom: denoms.uusd },
        coins: others,
        address: wallet.walletAddress,
        chainId: wallet.network.chainID as chainIDs,
      })
    );
    dispatch(setIsUpdating(false));
  }, [main, others, wallet, activeProvider]);
}
