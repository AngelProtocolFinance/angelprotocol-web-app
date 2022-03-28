import { WalletStatus } from "@terra-money/wallet-provider";
import { chainIDs } from "constants/chainIDs";
import useWalletContext from "hooks/useWalletContext";
import { useGetMetamask } from "providers/Metamask/Metamask";
import { useEffect, useRef } from "react";
import { updateChainID } from "services/chain/chainSlice";
import { chains } from "services/chain/types";
import {
  setActiveProvider,
  setIsSwitching,
} from "services/provider/providerSlice";
import { Providers, ProviderStates } from "services/provider/types";
import { terra } from "services/terra/terra";
import { useSetter } from "store/accessors";

export default function useProviderSwitcher() {
  const dispatch = useSetter();
  const terra_chain_ref = useRef<string>(chainIDs.testnet);

  //terra states
  const { status: terraStatus, network } = useWalletContext();
  const terraConnected = terraStatus === WalletStatus.WALLET_CONNECTED;
  const isTerraLoading = terraStatus === WalletStatus.INITIALIZING;

  //other states
  const { connected: isMetamaskConnected, loading: isMetamaskLoading } =
    useGetMetamask();
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
    return () => {
      dispatch(setActiveProvider(Providers.none));
    };
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
