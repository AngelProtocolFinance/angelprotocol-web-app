import { TokenWithBalance } from "services/types";
import { Token } from "types/server/aws";
import ethLogo from "assets/icons/currencies/ether.png";
import lunaLogo from "assets/icons/currencies/luna.png";
import coinIcon from "assets/icons/currencies/token.svg";
import { chainIDs } from "constants/chainIDs";
import { terraChainId } from "constants/env";
import { terra_lcds } from "constants/urls";

export const placeHolderToken: TokenWithBalance = {
  min_denom: "wei",
  symbol: "ETH",
  logo: ethLogo,
  decimals: 18,
  chainId: "1",
  rpcUrl: "",
  chainName: "Ethereum mainnet",
  blockExplorerUrl: "https://etherscan.io/",
  tokens: [],
  balance: 0,
};

export const unSupportedToken: TokenWithBalance = {
  min_denom: "xx",
  symbol: "XX",
  logo: coinIcon,
  decimals: 18,
  chainId: chainIDs.unsupported,
  rpcUrl: "",
  chainName: "Unsuported Network",
  blockExplorerUrl: "",
  tokens: [],
  balance: 0,
};

const avalancheToken: Token = {
  min_denom: "avax",
  symbol: "AVAX",
  logo: "https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=022",
  decimals: 18,
  chainId: "43113",
  rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
  chainName: "Avalanche Fuji Testnet",
  blockExplorerUrl: "https://testnet.snowtrace.io/",
  tokens: [
    {
      //Wrapped BNB
      logo: "https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=022",
      contractAddr: "0x1799aFD227E69e64D8fc55e2B5E62A27e21B33C6",
    },
    {
      //USDC
      logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=022",
      contractAddr: "0x5A0d0B5f9aAD08EA771c783D45Ca20ca803da44B",
    },
  ],
};

const binanceToken: Token = {
  min_denom: "bnb",
  symbol: "BNB",
  logo: "https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=022",
  decimals: 18,
  chainId: "97",
  rpcUrl: "https://data-seed-prebsc-1-s2.binance.org:8545",
  chainName: "Binance Smart Chain Testnet",
  blockExplorerUrl: "https://testnet.bscscan.com/",
  tokens: [],
};

const ethereumToken: Token = {
  min_denom: "wei",
  symbol: "ETH",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022",
  decimals: 18,
  chainId: "42",
  rpcUrl: "https://kovan.poa.network",
  chainName: "Kovan Test Network",
  blockExplorerUrl: "https://kovan.etherscan.io/",
  tokens: [],
};

export const lunaToken: Token = {
  min_denom: "uluna",
  symbol: "LUNA",
  logo: lunaLogo,
  decimals: 6,
  chainId: "pisco-1",
  rpcUrl: "https://pisco-lcd.terra.dev",
  chainName: "Terra Testnet",
  blockExplorerUrl: "https://finder.terra.money/testnet/tx",
  tokens: [],
};

export const terraNativeAssets: { [min_denom: string]: Token | undefined } = {
  uluna: {
    min_denom: "uluna",
    symbol: "LUNA",
    logo: lunaLogo,
    decimals: 6,
    chainId: terraChainId,
    rpcUrl: terra_lcds[terraChainId],
    chainName: "Terra Testnet",
    blockExplorerUrl: "https://finder.terra.money/testnet/tx",
    tokens: [],
  },
};

//TODO: get this from server
export const tokenList: Token[] = [
  avalancheToken,
  binanceToken,
  ethereumToken,
  lunaToken,
];
