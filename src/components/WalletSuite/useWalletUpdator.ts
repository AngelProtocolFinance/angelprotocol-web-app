import { useEffect } from "react";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { setIsUpdating, setWalletDetails } from "services/wallet/walletSlice";
import { useHaloBalance } from "services/terra/queriers";
import { Providers } from "services/provider/types";
import { TerraIdentifiers } from "services/wallet/types";
import useTerraBalance from "hooks/useTerraBalance";
import { chainIDs } from "constants/chainIDs";
import { denoms } from "constants/currency";
import { useSetter } from "store/accessors";

export default function useWalletUpdator(activeProvider: Providers) {
  const dispatch = useSetter();
  const wallet = useConnectedWallet();
  const { main, others } = useTerraBalance(denoms.uusd);
  const halo_balance = useHaloBalance();

  //updator for terra-station and wallet connect
  useEffect(() => {
    if (activeProvider !== Providers.terra) {
      return;
    }
    if (!wallet) {
      return;
    }

    if (
      //only run this updator when wallet is terra extension or leap-wallet or wallet-connect
      !(
        wallet.connection.identifier === TerraIdentifiers.station ||
        wallet.connection.identifier === TerraIdentifiers.leap ||
        wallet.connection.identifier === undefined
      )
    ) {
      return;
    }

    dispatch(setIsUpdating(true));
    //append halo balance
    const coinsWithHalo = [
      ...others,
      { amount: halo_balance, denom: denoms.uhalo },
    ];
    dispatch(
      setWalletDetails({
        icon: wallet.connection.icon,
        displayCoin: { amount: main, denom: denoms.uusd },
        coins: halo_balance !== 0 ? coinsWithHalo : others,
        address: wallet.walletAddress,
        chainId: wallet.network.chainID as chainIDs,
      })
    );
    dispatch(setIsUpdating(false));
  }, [main, others, wallet, activeProvider, halo_balance]);

  //updator of xdefi
  useEffect(() => {
    if (activeProvider !== Providers.terra) {
      return;
    }
    if (!wallet) {
      return;
    }

    if (
      //only run this updator when wallet is terra extension or wallet connect
      !(wallet.connection.identifier === TerraIdentifiers.xdefi)
    ) {
      return;
    }

    //get ethereum balance
  }, [main, others, wallet, activeProvider]);
}
