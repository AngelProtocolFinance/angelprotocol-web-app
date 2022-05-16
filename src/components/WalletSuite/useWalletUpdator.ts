import { Dec } from "@terra-money/terra.js";
import { ethers } from "ethers";
import { useEffect } from "react";
import { Dwindow, Providers } from "@types-slice/provider";
import binanceIcon from "assets/icons/wallets/binance.png";
import metamaskIcon from "assets/icons/wallets/metamask.png";
import { useTerraBalances } from "services/terra/multicall/queriers";
import { useSetter } from "store/accessors";
import { setIsUpdating, setWalletDetails } from "slices/walletSlice";
import useWalletContext from "hooks/useWalletContext";
import getTokenBalance from "helpers/getTokenBalance";
import { chainIDs } from "constants/chainIDs";
import { denomIcons, denoms } from "constants/currency";

export default function useWalletUpdator(activeProvider: Providers) {
  const dispatch = useSetter();
  const { wallet } = useWalletContext();
  const { terraBalances, isTerraBalancesLoading } = useTerraBalances();
  const ustBalance = getTokenBalance(terraBalances, denoms.uusd);

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

    if (isTerraBalancesLoading) {
      dispatch(setIsUpdating(true));
      return;
    }

    dispatch(
      setWalletDetails({
        id: wallet.connection.identifier || "terra_wc",
        icon: wallet.connection.icon,
        displayCoin: { amount: ustBalance, symbol: "UST" },
        coins: terraBalances,
        address: wallet.address,
        chainId: wallet.network.chainID,
      })
    );
    dispatch(setIsUpdating(false));
    //eslint-disable-next-line
  }, [wallet, activeProvider, isTerraBalancesLoading]);

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

        if (isTerraBalancesLoading) {
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
        const coins_copy = [...terraBalances];

        coins_copy.push(
          isBinance ? createBnbToken(eth_balance) : createEthToken(eth_balance)
        );

        dispatch(
          setWalletDetails({
            id: wallet.connection.identifier || "terra_wc",
            icon: wallet.connection.icon,
            displayCoin: { amount: ustBalance, symbol: "UST" },
            coins: coins_copy,
            address: wallet.address,
            //for multi-chain wallets, should just be testnet or mainnet
            chainId:
              wallet.network.chainID === chainIDs.terra_main
                ? chainIDs.mainnet
                : wallet.network.chainID === chainIDs.terra_test
                ? chainIDs.testnet
                : `${network.chainId}`,
          })
        );
        dispatch(setIsUpdating(false));
      } catch (err) {
        //TODO: tooltip on wallet update errors
        dispatch(setIsUpdating(false));
      }
    })();
    //eslint-disable-next-line
  }, [wallet, activeProvider, isTerraBalancesLoading]);

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
        const eth_coin = createEthToken(eth_balance);

        dispatch(
          setWalletDetails({
            id: undefined,
            icon: metamaskIcon,
            displayCoin: { amount: eth_coin.balance, symbol: eth_coin.symbol },
            coins: [eth_coin],
            address,
            chainId: `${network.chainId}`,
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
        const bnb_coin = createBnbToken(bnb_balance);
        dispatch(
          setWalletDetails({
            id: undefined,
            icon: binanceIcon,
            displayCoin: { amount: bnb_coin.balance, symbol: "BNB" },
            coins: [bnb_coin],
            address,
            chainId: `${network.chainId}`,
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

function createBnbToken(balance: number) {
  return {
    balance,
    min_denom: denoms.bnb,
    symbol: "BNB",
    decimals: 18,
    logo: denomIcons.bnb,
  };
}

function createEthToken(balance: number) {
  return {
    balance,
    min_denom: denoms.wei,
    symbol: "ETH",
    decimals: 18,
    logo: denomIcons.wei,
  };
}

export const createUSTToken = (balance: number) => ({
  balance,
  min_denom: denoms.uusd,
  symbol: "UST",
  decimals: 6,
  logo: denomIcons.uusd,
});
