// import { SigningStargateClient } from "@cosmjs/stargate";
import { Keplr, ChainInfo } from "@keplr-wallet/types";
import { cosmoshub_test_rest, cosmoshub_test_rpc } from "constants/urls";
import { chains } from "contracts/types";
import { useState } from "react";
import { DWindow } from "types/window";

const dwindow: DWindow = window;
export default function useKeplr() {
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);
  const [provider, setProvider] = useState<Keplr | undefined>(undefined);
  const [address, setAddress] = useState("");

  async function connect() {
    if (!dwindow.keplr) {
      window.open("https://phantom.app/", "_blank", "noopener noreferrer");
      return;
    }
    try {
      setLoading(true);
      //add cosmoshub-testnet chain to wallet
      await dwindow.keplr.experimentalSuggestChain(cosmos_test_chain);

      await dwindow.keplr.enable(chains.cosmos_test);
      const offline_signer = dwindow.getOfflineSigner!(chains.cosmos_test);

      const accounts = await offline_signer.getAccounts();
      const address = accounts[0].address;

      // const client = await SigningStargateClient.connectWithSigner(
      //   cosmoshub_test_rpc,
      //   offline_signer
      // );
      //TODO: display balance
      // const balances = await client.getAllBalances(address);
      // console.log(balances);

      setAddress(address);
      setProvider(dwindow.keplr);
      setConnected(true);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  async function disconnect() {
    setAddress("");
    setProvider(undefined);
    setConnected(false);
  }

  return {
    setters: { connect, disconnect },
    state: { loading, address, connected, provider },
  };
}

const cosmos_test_chain: ChainInfo = {
  chainId: chains.cosmos_test,
  chainName: "Photon",
  rpc: cosmoshub_test_rpc,
  rest: cosmoshub_test_rest,
  // Staking coin information
  stakeCurrency: {
    // Coin denomination to be displayed to the user.
    coinDenom: "PHOTON",
    // Actual denom (i.e. uatom, uscrt) used by the blockchain.
    coinMinimalDenom: "uphoton",
    // # of decimal points to convert minimal denomination to user-facing denomination.
    coinDecimals: 6,
    // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
    // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
    // coinGeckoId: ""
  },
  // (Optional) If you have a wallet webpage used to stake the coin then provide the url to the website in `walletUrlForStaking`.
  // The 'stake' button in Keplr extension will link to the webpage.
  // walletUrlForStaking: "",
  // The BIP44 path.
  bip44: {
    // You can only set the coin type of BIP44.
    // 'Purpose' is fixed to 44.
    coinType: 118,
  },
  // Bech32 configuration to show the address to user.
  // This field is the interface of
  // {
  //   bech32PrefixAccAddr: string;
  //   bech32PrefixAccPub: string;
  //   bech32PrefixValAddr: string;
  //   bech32PrefixValPub: string;
  //   bech32PrefixConsAddr: string;
  //   bech32PrefixConsPub: string;
  // }
  bech32Config: {
    bech32PrefixAccAddr: "cosmos",
    bech32PrefixAccPub: "cosmos",
    bech32PrefixValAddr: "cosmosvaloper",
    bech32PrefixValPub: "cosmosvaloperpub",
    bech32PrefixConsAddr: "cosmosvalcons",
    bech32PrefixConsPub: "cosmosvalconspub",
  },
  // List of all coin/tokens used in this chain.
  currencies: [
    {
      // Coin denomination to be displayed to the user.
      coinDenom: "PHOTON",
      // Actual denom (i.e. uatom, uscrt) used by the blockchain.
      coinMinimalDenom: "uphoton",
      // # of decimal points to convert minimal denomination to user-facing denomination.
      coinDecimals: 6,
      // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
      // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
      // coinGeckoId: ""
    },
  ],
  // List of coin/tokens used as a fee token in this chain.
  feeCurrencies: [
    {
      // Coin denomination to be displayed to the user.
      coinDenom: "PHOTON",
      // Actual denom (i.e. uatom, uscrt) used by the blockchain.
      coinMinimalDenom: "uphoton",
      // # of decimal points to convert minimal denomination to user-facing denomination.
      coinDecimals: 6,
      // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
      // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
      // coinGeckoId: ""
    },
  ],
  // (Optional) The number of the coin type.
  // This field is only used to fetch the address from ENS.
  // Ideally, it is recommended to be the same with BIP44 path's coin type.
  // However, some early chains may choose to use the Cosmos Hub BIP44 path of '118'.
  // So, this is separated to support such chains.
  coinType: 118,
  // (Optional) This is used to set the fee of the transaction.
  // If this field is not provided, Keplr extension will set the default gas price as (low: 0.01, average: 0.025, high: 0.04).
  // Currently, Keplr doesn't support dynamic calculation of the gas prices based on on-chain data.
  // Make sure that the gas prices are higher than the minimum gas prices accepted by chain validators and RPC/REST endpoint.
  gasPriceStep: {
    low: 0.01,
    average: 0.025,
    high: 0.04,
  },
};
