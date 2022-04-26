import { WalletStatus } from "@terra-money/wallet-provider";
import { ChainIDs } from "@types-lists";
import { ProviderStates } from "@types-slice/provider";
import { useEffect, useRef } from "react";
import { useGetBinanceWallet } from "contexts/BinanceWalletContext/BinanceWalletContext";
import { useGetMetamask } from "contexts/MetamaskContext/MetamaskContext";
import { terra } from "services/terra/terra";
import { updateChainID } from "slices/chainSlice";
import { setActiveProvider, setIsSwitching } from "slices/providerSlice";
import { useSetter } from "store/accessors";
import useWalletContext from "hooks/useWalletContext";

export default function useProviderSwitcher() {
  const dispatch = useSetter();
  const terra_chain_ref = useRef<ChainIDs>("bombay-12");

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
    const chainID: ChainIDs =
      (wallet?.network.chainID as ChainIDs) || "columbus-5";
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
