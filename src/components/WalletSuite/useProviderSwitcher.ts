import { WalletStatus } from "@terra-money/wallet-provider";
import { chainIDs } from "constants/chainIDs";
import useWalletContext from "hooks/useWalletContext";
import { useGetBinance } from "providers/BinanceWallet/BinanceWallet";
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
  const terra_chain_ref = useRef<string>(chainIDs.terra_test);

  //terra states
  const { status: terraStatus, wallet } = useWalletContext();
  const terraConnected = terraStatus === WalletStatus.WALLET_CONNECTED;
  const isTerraLoading = terraStatus === WalletStatus.INITIALIZING;

  //other states
  const { connected: isMetamaskConnected, loading: isMetamaskLoading } =
    useGetMetamask();
  const { connected: isBinanceConnected, loading: isBinanceLoading } =
    useGetBinance();

  const providerStates: ProviderStates = [
    [Providers.terra, terraConnected],
    [Providers.ethereum, isMetamaskConnected],
    [Providers.binance, isBinanceConnected],
  ];

  //find first connected provider
  //undefined if not wallet is connected
  const activeProvider = providerStates.find(
    ([, isProviderConnected]) => isProviderConnected
  );

  const isLoading = isTerraLoading || isMetamaskLoading || isBinanceLoading;

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
    const chainID = wallet?.network.chainID || chainIDs.terra_main;
    dispatch(
      updateChainID({
        chain: chains.terra,
        chainID: chainID as chainIDs,
      })
    );

    //if network is changed invalidate terra services
    if (terra_chain_ref.current !== chainID) {
      dispatch(terra.util.resetApiState());
      terra_chain_ref.current = chainID;
    }
    //eslint-disable-next-line
  }, [wallet, dispatch]);
}
