import { WalletStatus } from "@terra-money/wallet-provider";
import { useEffect, useRef } from "react";
import { terra } from "services/terra/terra";
import { useGetBinanceWallet } from "contexts/BinanceWalletContext/BinanceWalletContext";
import { useGetMetamask } from "contexts/MetamaskContext/MetamaskContext";
import { useSetter } from "store/accessors";
import { updateChainID } from "slices/chainSlice";
import { ProviderStates } from "slices/providerSlice";
import { setActiveProvider, setIsSwitching } from "slices/providerSlice";
import useWalletContext from "hooks/useWalletContext";
import { chainIDs } from "constants/chainIDs";

export default function useProviderSwitcher() {
  const dispatch = useSetter();
  const terra_chain_ref = useRef<string>(chainIDs.terra_main);

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
    ["terra", terraConnected],
    ["ethereum", isMetamaskConnected],
    ["binance", isBinanceConnected],
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
      dispatch(setActiveProvider("none"));
    }
    return () => {
      dispatch(setActiveProvider("none"));
    };
    //eslint-disable-next-line
  }, [activeProvider]);

  //update chain for terra
  useEffect(() => {
    const chainID = wallet?.network.chainID || chainIDs.terra_main;
    dispatch(
      updateChainID({
        chain: "terra",
        chainID: chainID,
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
