import { Dec } from "@terra-money/terra.js";
import { ethers } from "ethers";
import { useEffect } from "react";
import { chainIDs } from "types/chainIDs";
import { denoms } from "types/denoms";
import binanceIcon from "assets/icons/wallets/binance.png";
import metamaskIcon from "assets/icons/wallets/metamask.png";
import { Dwindow, Providers } from "services/provider/types";
import { useBalances, useHaloBalance } from "services/terra/queriers";
import { TerraIdentifiers } from "services/wallet/types";
import { setIsUpdating, setWalletDetails } from "services/wallet/walletSlice";
import { useSetter } from "store/accessors";
import useWalletContext from "hooks/useWalletContext";

export default function useWalletUpdator(activeProvider: Providers) {
  const dispatch = useSetter();
  const { wallet } = useWalletContext();
  const { main, others, terraBalancesLoading } = useBalances(denoms.uusd);
  const { haloBalance, haloBalanceLoading } = useHaloBalance();

  //updator for terra-station and wallet connect
  useEffect(() => {
    if (activeProvider !== Providers.terra) {
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
        wallet.connection.identifier === TerraIdentifiers.torus ||
        wallet.connection.identifier === TerraIdentifiers.station ||
        wallet.connection.identifier === TerraIdentifiers.leap ||
        wallet.connection.identifier === TerraIdentifiers.safepal ||
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
      { amount: haloBalance, denom: denoms.uhalo },
    ];

    dispatch(
      setWalletDetails({
        id: wallet.connection.identifier || TerraIdentifiers.terra_wc,
        icon: wallet.connection.icon,
        displayCoin: { amount: main, denom: denoms.uusd },
        coins: haloBalance !== 0 ? coinsWithHalo : others,
        address: wallet.address,
        chainId: wallet.network.chainID as chainIDs,
        supported_denoms: [denoms.uusd, denoms.uluna],
      })
    );
    dispatch(setIsUpdating(false));
    //eslint-disable-next-line
  }, [wallet, activeProvider, terraBalancesLoading, haloBalanceLoading]);

  //updator of xdefi
  useEffect(() => {
    (async () => {
      try {
        if (activeProvider !== Providers.terra) {
          return;
        }
        if (!wallet) {
          return;
        }

        if (
          //only run this updator when wallet is terra extension or wallet connect
          !(wallet.connection.identifier === TerraIdentifiers.xdefi)
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
          denom: isBinance ? denoms.bnb : denoms.ether,
        });

        const supported_denoms = [denoms.uusd, denoms.uluna];
        supported_denoms.push(isBinance ? denoms.bnb : denoms.ether);

        dispatch(
          setWalletDetails({
            id: wallet.connection.identifier || TerraIdentifiers.terra_wc,
            icon: wallet.connection.icon,
            displayCoin: { amount: main, denom: denoms.uusd },
            coins: coins_copy,
            address: wallet.address,
            //for multi-chain wallets, should just be testnet or mainnet
            chainId:
              wallet.network.chainID === chainIDs.mainnet
                ? chainIDs.gen_mainnet
                : wallet.network.chainID === chainIDs.testnet
                ? chainIDs.gen_testnet
                : (`${network.chainId}` as chainIDs),
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
        if (activeProvider !== Providers.ethereum) return;
        dispatch(setIsUpdating(true));
        const provider = new ethers.providers.Web3Provider(dwindow.ethereum!);
        const network = await provider.getNetwork();
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const wei_balance = await signer.getBalance();
        const eth_balance = new Dec(parseInt(wei_balance.toHexString(), 16))
          .div(1e18)
          .toNumber();
        const eth_coin = { amount: eth_balance, denom: denoms.ether };

        dispatch(
          setWalletDetails({
            id: undefined,
            icon: metamaskIcon,
            displayCoin: eth_coin,
            coins: [eth_coin],
            address,
            chainId: `${network.chainId}` as chainIDs,
            supported_denoms: [denoms.ether, denoms.bnb],
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
        if (activeProvider !== Providers.binance) return;
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
        const bnb_coin = { amount: bnb_balance, denom: denoms.bnb };

        dispatch(
          setWalletDetails({
            id: undefined,
            icon: binanceIcon,
            displayCoin: bnb_coin,
            coins: [bnb_coin],
            address,
            chainId: `${network.chainId}` as chainIDs,
            supported_denoms: [denoms.bnb],
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
