import { Dec } from "@terra-money/terra.js";
import { ethers } from "ethers";
import { useEffect } from "react";
import { ChainIDs, Denoms } from "@types-lists";
import { Dwindow, Providers } from "@types-slice/provider";
import { Coin } from "@types-slice/wallet";
import binanceIcon from "assets/icons/wallets/binance.png";
import metamaskIcon from "assets/icons/wallets/metamask.png";
import { useBalances, useHaloBalance } from "services/terra/queriers";
import { useSetter } from "store/accessors";
import { setIsUpdating, setWalletDetails } from "slices/walletSlice";
import useWalletContext from "hooks/useWalletContext";

export default function useWalletUpdator(activeProvider: Providers) {
  const dispatch = useSetter();
  const { wallet } = useWalletContext();
  const { main, others, terraBalancesLoading } = useBalances("uusd");
  const { haloBalance, haloBalanceLoading } = useHaloBalance();

  //updator for terra-station and wallet connect
  useEffect(() => {
    if (activeProvider !== "terra") {
      dispatch(setIsUpdating(false));
      return;
    }

    if (!wallet) {
      dispatch(setIsUpdating(false));
      return;
    }

    if (
      //only run this updator when wallet is terra extension or leap-wallet or wallet-connect
      !(
        wallet.connection.identifier === "torus" ||
        wallet.connection.identifier === "station" ||
        wallet.connection.identifier === "leap-wallet" ||
        wallet.connection.identifier === "SafePal" ||
        wallet.connection.identifier === undefined
      )
    ) {
      return;
    }

    if (terraBalancesLoading || haloBalanceLoading) {
      dispatch(setIsUpdating(true));
      return;
    }
    //append halo balance
    const coinsWithHalo = [
      ...others,
      { amount: haloBalance, denom: "uhalo" as Denoms },
    ];

    dispatch(
      setWalletDetails({
        id: wallet.connection.identifier || "terra_wc",
        icon: wallet.connection.icon,
        displayCoin: { amount: main, denom: "uusd" },
        coins: haloBalance !== 0 ? coinsWithHalo : others,
        address: wallet.address,
        chainId: wallet.network.chainID as ChainIDs,
        supported_denoms: ["uusd", "uluna"],
      })
    );
    dispatch(setIsUpdating(false));
    //eslint-disable-next-line
  }, [wallet, activeProvider, terraBalancesLoading, haloBalanceLoading]);

  //updator of xdefi
  useEffect(() => {
    (async () => {
      try {
        if (activeProvider !== "terra") {
          return;
        }
        if (!wallet) {
          return;
        }

        if (
          //only run this updator when wallet is terra extension or wallet connect
          !(wallet.connection.identifier === "xdefi-wallet")
        ) {
          return;
        }

        if (terraBalancesLoading || haloBalanceLoading) {
          dispatch(setIsUpdating(true));
          return;
        }
        const dwindow: Dwindow = window;
        //dwindow.xfi.ethereum is guaranteed to be defined here since it's available on
        //wallet connection selection

        const provider = new ethers.providers.Web3Provider(
          dwindow.xfi?.ethereum!
        );

        const signer = provider.getSigner();
        const network = await provider.getNetwork();
        const wei_balance = await signer.getBalance();
        const eth_balance = new Dec(parseInt(wei_balance.toHexString(), 16))
          .div(1e18)
          .toNumber();

        const isBinance = provider._network.name.includes("bnb");

        const coins_copy = [...others];
        coins_copy.push({
          amount: eth_balance,
          denom: isBinance ? "bnb" : "ether",
        });

        const supported_denoms: Denoms[] = ["uusd", "uluna"];
        supported_denoms.push(isBinance ? "bnb" : "ether");

        dispatch(
          setWalletDetails({
            id: wallet.connection.identifier || "terra_wc",
            icon: wallet.connection.icon,
            displayCoin: { amount: main, denom: "uusd" },
            coins: coins_copy,
            address: wallet.address,
            //for multi-chain wallets, should just be testnet or mainnet
            chainId:
              wallet.network.chainID === "columbus-5"
                ? "mainnet"
                : wallet.network.chainID === "bombay-12"
                ? "testnet"
                : (`${network.chainId}` as ChainIDs),
            supported_denoms,
          })
        );
        dispatch(setIsUpdating(false));
      } catch (err) {
        //TODO: tooltip on wallet update errors
        dispatch(setIsUpdating(false));
      }
    })();
    //eslint-disable-next-line
  }, [wallet, activeProvider, haloBalanceLoading, terraBalancesLoading]);

  //updator for metamask
  useEffect(() => {
    (async () => {
      try {
        const dwindow = window as Dwindow;
        if (activeProvider !== "ethereum") return;
        dispatch(setIsUpdating(true));
        const provider = new ethers.providers.Web3Provider(dwindow.ethereum!);
        const network = await provider.getNetwork();
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const wei_balance = await signer.getBalance();
        const eth_balance = new Dec(parseInt(wei_balance.toHexString(), 16))
          .div(1e18)
          .toNumber();
        const eth_coin: Coin = { amount: eth_balance, denom: "ether" };

        dispatch(
          setWalletDetails({
            id: undefined,
            icon: metamaskIcon,
            displayCoin: eth_coin,
            coins: [eth_coin],
            address,
            chainId: `${network.chainId}` as ChainIDs,
            supported_denoms: ["ether", "bnb"],
          })
        );

        dispatch(setIsUpdating(false));
      } catch (err) {
        //TODO: tooltip on wallet update errors
        dispatch(setIsUpdating(false));
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProvider]);

  //updator for binance
  useEffect(() => {
    (async () => {
      try {
        const dwindow = window as Dwindow;
        if (activeProvider !== "binance") return;
        dispatch(setIsUpdating(true));
        const provider = new ethers.providers.Web3Provider(
          dwindow.BinanceChain!
        );
        const network = await provider.getNetwork();
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const wei_balance = await signer.getBalance();
        const bnb_balance = new Dec(parseInt(wei_balance.toHexString(), 16))
          .div(1e18)
          .toNumber();
        const bnb_coin: Coin = { amount: bnb_balance, denom: "bnb" };

        dispatch(
          setWalletDetails({
            id: undefined,
            icon: binanceIcon,
            displayCoin: bnb_coin,
            coins: [bnb_coin],
            address,
            chainId: `${network.chainId}` as ChainIDs,
            supported_denoms: ["bnb"],
          })
        );

        dispatch(setIsUpdating(false));
      } catch (err) {
        //TODO: tooltip on wallet update errors
        dispatch(setIsUpdating(false));
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProvider]);
}
