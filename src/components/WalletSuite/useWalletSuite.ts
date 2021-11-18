import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import { useWallet as useEthWallet } from "use-wallet";
import { useEffect } from "react";
import { useSetter } from "store/accessors";
import { setLoading, setActive } from "services/wallet/walletSlice";
import { Wallets, WalletStates } from "services/wallet/types";
import { useGetPhantom } from "contexts/PhantomProvider";

export default function useWalletSuite() {
  const { loading: phantomLoading, connected: phantomConnected } =
    useGetPhantom();
  const dispatch = useSetter();
  const { status: ethStatus } = useEthWallet();

  const ethConnected = ethStatus === "connected";
  const ethLoading = ethStatus === "connecting";

  const { status: terraStatus } = useWallet();
  const terraConnected = terraStatus === WalletStatus.WALLET_CONNECTED;
  const isTerraLoading = terraStatus === WalletStatus.INITIALIZING;

  const isLoading = isTerraLoading || ethLoading || phantomLoading; // || false || otherwallet loading state

  const walletStates: WalletStates = [
    [Wallets.terra, terraConnected],
    [Wallets.ethereum, ethConnected],
    [Wallets.phantom, phantomConnected],
  ];

  //find first connected wallet
  //undefined if not wallet is connected
  const connectedWallet = walletStates.find((walletState) => walletState[1]);

  useEffect(() => {
    dispatch(setLoading(isLoading));
    //eslint-disable-next-line
  }, [isLoading]);

  useEffect(() => {
    if (connectedWallet) {
      const [wallet] = connectedWallet;
      dispatch(setActive(wallet));
    } else {
      dispatch(setActive(Wallets.none));
    }
    return () => {
      dispatch(setActive(Wallets.none));
    };
    //eslint-disable-next-line
  }, [connectedWallet]);
}
