import { ethers, utils } from "ethers";
import { useEffect } from "react";
import binanceIcon from "assets/icons/wallets/binance.png";
import metamaskIcon from "assets/icons/wallets/metamask.png";
import { useSetter } from "store/accessors";
import { Dwindow, Providers } from "slices/providerSlice";
import { setIsUpdating, setWalletDetails } from "slices/walletSlice";
import { denomIcons, denoms } from "constants/currency";

export default function useWalletUpdator(activeProvider: Providers) {
  const dispatch = useSetter();

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
        const eth_balance = +utils.formatUnits(wei_balance, 18);
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
        const bnb_balance = +utils.formatUnits(wei_balance, 18);

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
