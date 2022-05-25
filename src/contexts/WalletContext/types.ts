import { ethers } from "ethers";

export interface Dwindow extends Window {
  xfi?: {
    ethereum?: any;
  };
  ethereum?: any;
  BinanceChain?: any;
}

export interface Web3Provider extends ethers.providers.Web3Provider {}

/*** EIP1193 spec https://eips.ethereum.org/EIPS/eip-1193*/
//request
interface RequestArguments {
  readonly method: string;
  readonly params?: readonly unknown[] | object;
}

export type AccountChangeHandler = (accounts: string[]) => void;
export type ChainChangeHandler = (chainId: string) => void;

export type InjectedProvider = {
  chainId: string;
  request: <T>(args: RequestArguments) => Promise<T>;
  on(ev: "chainChanged", listener: ChainChangeHandler): any;
  on(ev: "accountsChanged", listener: AccountChangeHandler): any;
  removeAllListeners(): unknown;
};

//FOR ADDING CHAIN
//specs: https://eips.ethereum.org/EIPS/eip-3085
export interface ChainParams {
  chainId: string;
  blockExplorerUrls?: string[];
  chainName?: string;
  iconUrls?: string[];
  nativeCurrency?: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls?: string[];
}

export type ProviderId = "binance-wallet" | "metamask";
export type Connection = {
  logo: string;
  name: string;
  connect(): Promise<void>;
};
export type ProviderInfo = {
  id: ProviderId;
  logo: string;
  chainId: string;
  address: string;
};

type ProviderStatus = { providerInfo?: ProviderInfo; isLoading: boolean };
export type ProviderStatuses = ProviderStatus[];

type ERC20Token = {
  contractAddr: string;
  logo: string;
};

export type NativeToken = {
  min_denom: string; //avax
  symbol: string; //AVAX
  logo: string;
  decimals: number; //18
  chainId: string; // "1"-mainnet "97"-binance-test "43017"-avax

  //additional info for adding chain in wallet
  rpcUrl: string;
  chainName: string; //Avalanche
  blockExplorerUrl: string; //https://testnet.snowtrace.io

  erc20Tokens: ERC20Token[];
};

export type NativeTokenWithBalance = NativeToken & { balance: string };
