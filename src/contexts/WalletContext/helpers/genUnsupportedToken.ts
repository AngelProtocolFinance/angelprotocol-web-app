import coinIcon from "assets/icons/currencies/coin.svg";

export default function genUnsupportedToken(chainId: string) {
  return {
    min_denom: "denom",
    symbol: "??",
    logo: coinIcon,
    decimals: 18,
    chainId: chainId,
    rpcUrl: "",
    chainName: "Unsuported Network",
    blockExplorerUrl: "",
    erc20Tokens: [],
    balance: "0",
  };
}
