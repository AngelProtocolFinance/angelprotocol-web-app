import { useEffect } from "react";
import { ethers } from "ethers";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { Dec } from "@terra-money/terra.js";
import { setIsUpdating, setWalletDetails } from "services/wallet/walletSlice";
import { useHaloBalance } from "services/terra/queriers";
import { Providers, XdefiWindow } from "services/provider/types";
import { TerraIdentifiers } from "services/wallet/types";
import useTerraBalance from "hooks/useTerraBalance";
import { chainIDs } from "constants/chainIDs";
import { denoms } from "constants/currency";
import { useSetter } from "store/accessors";

export default function useWalletUpdator(activeProvider: Providers) {
  const dispatch = useSetter();
  const wallet = useConnectedWallet();
  const { main, others } = useTerraBalance(denoms.uusd);
  const halo_balance = useHaloBalance();

  //updator for terra-station and wallet connect
  useEffect(() => {
    if (activeProvider !== Providers.terra) {
      return;
    }
    if (!wallet) {
      return;
    }

    if (
      //only run this updator when wallet is terra extension or leap-wallet or wallet-connect
      !(
        wallet.connection.identifier === TerraIdentifiers.station ||
        wallet.connection.identifier === TerraIdentifiers.leap ||
        wallet.connection.identifier === undefined
      )
    ) {
      return;
    }

    dispatch(setIsUpdating(true));
    //append halo balance
    const coinsWithHalo = [
      ...others,
      { amount: halo_balance, denom: denoms.uhalo },
    ];
    dispatch(
      setWalletDetails({
        id: wallet.connection.identifier || TerraIdentifiers.terra_wc,
        icon: wallet.connection.icon,
        displayCoin: { amount: main, denom: denoms.uusd },
        coins: halo_balance !== 0 ? coinsWithHalo : others,
        address: wallet.walletAddress,
        chainId: wallet.network.chainID as chainIDs,
        supported_denoms: [denoms.uusd],
      })
    );
    dispatch(setIsUpdating(false));
    //eslint-disable-next-line
  }, [main, others, wallet, activeProvider, halo_balance]);

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

        dispatch(setIsUpdating(true));
        const xwindow: XdefiWindow = window;
        //xwindow.xfi.ethereum is guaranteed to be defined here since it's available on
        //wallet connection selection

        const provider = new ethers.providers.Web3Provider(
          xwindow.xfi?.ethereum!
        );
        const signer = provider.getSigner();
        const wei_balance = await signer.getBalance();
        const eth_balance = new Dec(parseInt(wei_balance.toHexString(), 16))
          .div(1e18)
          .toNumber();

        const coinsWithEth = [
          ...others,
          { amount: eth_balance, denom: denoms.ether },
        ];

        dispatch(
          setWalletDetails({
            id: wallet.connection.identifier || TerraIdentifiers.terra_wc,
            icon: wallet.connection.icon,
            displayCoin: { amount: main, denom: denoms.uusd },
            coins: coinsWithEth,
            address: wallet.terraAddress,
            //for multi-chain wallets, should just be testnet or mainnet
            chainId:
              wallet.network.chainID === chainIDs.mainnet
                ? chainIDs.gen_mainnet
                : chainIDs.gen_testnet,
            supported_denoms: [denoms.uusd, denoms.ether],
          })
        );
        dispatch(setIsUpdating(false));
      } catch (err) {
        console.error(err);
      }
    })();
    //eslint-disable-next-line
  }, [main, others, wallet, activeProvider, halo_balance]);
}
