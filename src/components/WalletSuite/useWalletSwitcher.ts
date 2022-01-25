import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import { useEffect, useRef } from "react";
import { useSetter } from "store/accessors";
import { setIsSwitching, setProvider } from "services/wallet/walletSlice";
import { Providers, ProviderStates } from "services/wallet/types";
import { updateChainID } from "services/chain/chainSlice";
import { chainIDs } from "contracts/types";
import { chains } from "services/chain/types";
import { terra } from "services/terra/terra";

export default function useWalletSwitcher() {
  const dispatch = useSetter();
  const terra_chain_ref = useRef<string>(chainIDs.mainnet);
  const { status: terraStatus, network } = useWallet();
  const terraConnected = terraStatus === WalletStatus.WALLET_CONNECTED;
  const isTerraLoading = terraStatus === WalletStatus.INITIALIZING;
  const isLoading = isTerraLoading; // || other provider loading state;
  const providerStates: ProviderStates = [[Providers.terra, terraConnected]];
  //find first connected provider
  //undefined if not wallet is connected
  const connectedWallet = providerStates.find(
    ([, isProviderConnected]) => isProviderConnected
  );

  useEffect(() => {
    dispatch(setIsSwitching(isLoading));
    //eslint-disable-next-line
  }, [isLoading]);

  useEffect(() => {
    if (connectedWallet) {
      const [wallet] = connectedWallet;
      dispatch(setProvider(wallet));
    } else {
      dispatch(setProvider(Providers.none));
    }
    return () => {
      dispatch(setProvider(Providers.none));
    };
    //eslint-disable-next-line
  }, [connectedWallet]);

  //update chain for terra
  useEffect(() => {
    dispatch(
      updateChainID({
        chain: chains.terra,
        chainID: network.chainID as chainIDs,
      })
    );
    //if network is changed invalidate terra services
    if (terra_chain_ref.current !== network.chainID) {
      dispatch(terra.util.resetApiState());
      terra_chain_ref.current = network.chainID;
    }
    //eslint-disable-next-line
  }, [network]);
}
