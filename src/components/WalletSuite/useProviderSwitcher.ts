import {
  useWallet as useTerraWallet,
  WalletStatus,
} from "@terra-money/wallet-provider";
import { useEffect, useRef } from "react";
import {
  setActiveProvider,
  setIsSwitching,
} from "services/provider/providerSlice";
import { Providers, ProviderStates } from "services/provider/types";
import { updateChainID } from "services/chain/chainSlice";
import { chains } from "services/chain/types";
import { terra } from "services/terra/terra";
import { chainIDs } from "constants/chainIDs";
import { useSetter } from "store/accessors";
import useWallet from "hooks/useWallet";

export default function useProviderSwitcher() {
  const dispatch = useSetter();
  const terra_chain_ref = useRef<string>(chainIDs.testnet);

  //terra states
  const { status: terraStatus, network } = useTerraWallet();
  const terraConnected = terraStatus === WalletStatus.WALLET_CONNECTED;
  const isTerraLoading = terraStatus === WalletStatus.INITIALIZING;

  //other states
  const { isConnected: isMetamaskConnected, isLoading: isMetamaskLoading } =
    useWallet();
  // const { connected: ethConnected } = useGetter((state) => state.metamask);

  const providerStates: ProviderStates = [
    [Providers.terra, terraConnected],
    [Providers.ethereum, isMetamaskConnected],
  ];

  //find first connected provider
  //undefined if not wallet is connected
  const activeProvider = providerStates.find(
    ([, isProviderConnected]) => isProviderConnected
  );

  const isLoading = isTerraLoading || isMetamaskLoading;

  useEffect(() => {
    dispatch(setIsSwitching(isLoading));
    //eslint-disable-next-line
  }, [isLoading]);

  useEffect(() => {
    if (activeProvider) {
      const [provider] = activeProvider;
      dispatch(setActiveProvider(provider));
    } else {
      dispatch(setActiveProvider(Providers.none));
    }
    //eslint-disable-next-line
  }, [activeProvider]);

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
