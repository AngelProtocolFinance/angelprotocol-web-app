import { WithBalance } from "services/types";
import { EVMNative, JunoNative, TerraNative, Token } from "types/server/aws";
import ethLogo from "assets/icons/currencies/ether.png";
import junoLogo from "assets/icons/currencies/juno.svg";
import lunaLogo from "assets/icons/currencies/luna.png";
import coinIcon from "assets/icons/currencies/token.svg";
import { chainIds } from "constants/chainIds";
import { IS_TEST } from "constants/env";

export const placeHolderToken: WithBalance = {
  type: "evm-native",
  symbol: "ETH",
  logo: ethLogo,
  decimals: 18,
  chain_id: "1",
  rpc_url: "",
  chain_name: "Ethereum mainnet",
  block_explorer_url: "https://etherscan.io/",
  tokens: [],
  balance: 0,
};

export const unSupportedToken: WithBalance = {
  type: "evm-native",
  symbol: "XX",
  logo: coinIcon,
  decimals: 18,
  chain_id: "",
  rpc_url: "",
  chain_name: "Unsuported Network",
  block_explorer_url: "",
  tokens: [],
  balance: 0,
};

const avalancheToken: EVMNative = {
  type: "evm-native",
  symbol: "AVAX",
  logo: "https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=022",
  decimals: 18,
  chain_id: "43113",
  rpc_url: "https://api.avax-test.network/ext/bc/C/rpc",
  chain_name: "Avalanche Fuji Testnet",
  block_explorer_url: "https://testnet.snowtrace.io/",
  tokens: [
    {
      //Wrapped BNB
      logo: "https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=022",
      contract_addr: "0x1799aFD227E69e64D8fc55e2B5E62A27e21B33C6",
    },
    {
      //USDC
      logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=022",
      contract_addr: "0x5A0d0B5f9aAD08EA771c783D45Ca20ca803da44B",
    },
  ],
};

const binanceToken: EVMNative = {
  type: "evm-native",
  symbol: "BNB",
  logo: "https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=022",
  decimals: 18,
  chain_id: "97",
  rpc_url: "https://data-seed-prebsc-1-s2.binance.org:8545",
  chain_name: "Binance Smart Chain Testnet",
  block_explorer_url: "https://testnet.bscscan.com/",
  tokens: [],
};

export const ethereumToken: EVMNative = {
  type: "evm-native",
  symbol: "ETH",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022",
  decimals: 18,
  chain_id: "42",
  rpc_url: "https://kovan.poa.network",
  chain_name: "Kovan Test Network",
  block_explorer_url: "https://kovan.etherscan.io/",
  tokens: [],
};

export const lunaToken: TerraNative = {
  type: "terra-native",
  symbol: "LUNA",
  logo: lunaLogo,
  decimals: 6,
  chain_id: "pisco-1",
  chain_name: "Terra Pisco Testnet",
};

export const junoToken: JunoNative = {
  type: "juno-native",
  symbol: IS_TEST ? "JUNOX" : "JUNO",
  logo: junoLogo,
  decimals: 6,
  chain_id: chainIds.juno,
  chain_name: "Juno Testnet",
};

//TODO: get this from server
export const tokenList: Token[] = [
  avalancheToken,
  binanceToken,
  ethereumToken,
  lunaToken,
  junoToken,
];
