import { WalletStatus } from "@terra-money/wallet-provider";
import { useEffect, useRef } from "react";
import { chainIDs } from "types/chainIDs";
import { chains } from "types/chains";
import { ProviderStates, Providers } from "types/slices/provider";
import { useGetBinanceWallet } from "contexts/BinanceWalletContext/BinanceWalletContext";
import { useGetMetamask } from "contexts/MetamaskContext/MetamaskContext";
import { terra } from "services/terra/terra";
import { updateChainID } from "slices/chainSlice";
import { setActiveProvider, setIsSwitching } from "slices/providerSlice";
import { useSetter } from "store/accessors";
import useWalletContext from "hooks/useWalletContext";

export default function useProviderSwitcher() {
  const dispatch = useSetter();
  const terra_chain_ref = useRef<string>(chainIDs.testnet);

  //terra states
  const { status: terraStatus, wallet } = useWalletContext();
  const terraConnected = terraStatus === WalletStatus.WALLET_CONNECTED;
  const isTerraLoading = terraStatus === WalletStatus.INITIALIZING;

  //other states
  const { connected: isMetamaskConnected, loading: isMetamaskLoading } =
    useGetMetamask();
  const { connected: isBinanceConnected, loading: isBinanceLoading } =
    useGetBinanceWallet();

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
    const chainID = wallet?.network.chainID || chainIDs.mainnet;
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
