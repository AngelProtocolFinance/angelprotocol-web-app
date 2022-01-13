import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import { useEffect, useRef } from "react";
import { useSetter } from "store/accessors";
import { setLoading, setActive } from "services/wallet/walletSlice";
import { Wallets, WalletStates } from "services/wallet/types";
import { updateChainID } from "services/chain/chainSlice";
import { chainIDs } from "contracts/types";
import { chains } from "services/chain/types";
import { terra } from "services/terra/terra";

export default function useWalletSuite() {
  const dispatch = useSetter();
  const terra_chain_ref = useRef<string>(chainIDs.mainnet);
  const { status: terraStatus, network } = useWallet();
  const terraConnected = terraStatus === WalletStatus.WALLET_CONNECTED;
  const isTerraLoading = terraStatus === WalletStatus.INITIALIZING;
  const isLoading = isTerraLoading;
  const walletStates: WalletStates = [[Wallets.terra, terraConnected]];
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
