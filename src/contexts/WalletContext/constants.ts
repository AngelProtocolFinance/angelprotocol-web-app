import coinIcon from "assets/icons/currencies/coin.svg";
import ethLogo from "assets/icons/currencies/ether.png";
import binanceWalletIcon from "assets/icons/wallets/binance.svg";
import metamaskIcon from "assets/icons/wallets/metamask.svg";
import xdefiIcon from "assets/icons/wallets/xdefi.jpg";
import { chainIDs } from "constants/chainIDs";
import { NativeToken, NativeTokenWithBalance, ProviderId } from "./types";

export const EIP1193Events = {
  accountsChanged: "accountsChanged",
  chainChanged: "chainChanged",
};

export const EIPMethods = {
  eth_requestAccounts: "eth_requestAccounts",
  wallet_addEthereumChain: "wallet_addEthereumChain",
  eth_chainId: "eth_chainId",
  //others
};

const avalancheToken: NativeToken = {
  min_denom: "avax",
  symbol: "AVAX",
  logo: "https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=022",
  decimals: 18,
  chainId: "43113",
  rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
  chainName: "Avalanche Fuji Testnet",
  blockExplorerUrl: "https://testnet.snowtrace.io/",
  erc20Tokens: [
    {
      logo: "https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=022",
      contractAddr: "0x1799aFD227E69e64D8fc55e2B5E62A27e21B33C6",
    },
  ],
};

const binanceToken: NativeToken = {
  min_denom: "bnb",
  symbol: "BNB",
  logo: "https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=022",
  decimals: 18,
  chainId: "97",
  rpcUrl: "https://data-seed-prebsc-1-s2.binance.org:8545",
  chainName: "Binance Smart Chain Testnet",
  blockExplorerUrl: "https://testnet.bscscan.com/",
  erc20Tokens: [],
};

const ethereumToken: NativeToken = {
  min_denom: "wei",
  symbol: "ETH",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022",
  decimals: 18,
  chainId: "42",
  rpcUrl: "https://kovan.poa.network",
  chainName: "Kovan Test Network",
  blockExplorerUrl: "https://kovan.etherscan.io/",
  erc20Tokens: [],
};

export const placeHolderToken: NativeTokenWithBalance = {
  min_denom: "wei",
  symbol: "ETH",
  logo: ethLogo,
  decimals: 18,
  chainId: "1",
  rpcUrl: "",
  chainName: "Ethereum mainnet",
  blockExplorerUrl: "https://etherscan.io/",
  erc20Tokens: [],
  balance: "0",
};

export const unSupportedToken: NativeTokenWithBalance = {
  min_denom: "xx",
  symbol: "XX",
  logo: coinIcon,
  decimals: 18,
  chainId: chainIDs.unsupported,
  rpcUrl: "",
  chainName: "Unsuported Network",
  blockExplorerUrl: "",
  erc20Tokens: [],
  balance: "0",
};

export const providerIcons: { [key in ProviderId]: string } = {
  "binance-wallet": binanceWalletIcon,
  metamask: metamaskIcon,
  xdefi: xdefiIcon,
};

//TODO: get this from server
export const tokenList: NativeToken[] = [
  avalancheToken,
  binanceToken,
  ethereumToken,
];
