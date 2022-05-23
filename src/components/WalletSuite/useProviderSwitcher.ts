import { useEffect } from "react";
import { useGetBinanceWallet } from "contexts/BinanceWalletContext/BinanceWalletContext";
import { useGetMetamask } from "contexts/MetamaskContext/MetamaskContext";
import { useSetter } from "store/accessors";
import { ProviderStates } from "slices/providerSlice";
import { setActiveProvider, setIsSwitching } from "slices/providerSlice";

export default function useProviderSwitcher() {
  const dispatch = useSetter();

  //other states
  const { connected: isMetamaskConnected, loading: isMetamaskLoading } =
    useGetMetamask();
  const { connected: isBinanceConnected, loading: isBinanceLoading } =
    useGetBinanceWallet();

  const providerStates: ProviderStates = [
    ["ethereum", isMetamaskConnected],
    ["binance", isBinanceConnected],
  ];

  //find first connected provider
  //undefined if not wallet is connected
  const activeProvider = providerStates.find(
    ([, isProviderConnected]) => isProviderConnected
  );

  const isLoading = isMetamaskLoading || isBinanceLoading;

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
}
