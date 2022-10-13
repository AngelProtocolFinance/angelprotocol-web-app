export enum chainIDs {
  junoMain = "juno-1",
  junoTest = "uni-5",
  // binanceMain = "56",
  binanceTest = "97",
  ethMain = "1",
  ethTest = "5",
  terraMain = "phoenix-1",
  terraTest = "pisco-1",
  //add axelar, connext
}

type Info = { txExplorer: string };

const _chains: { [key in chainIDs]: Info } = {
  1: { txExplorer: "https://etherscan.io/tx" },
  5: { txExplorer: "https://goerli.etherscan.io/tx" },
  97: { txExplorer: "https://testnet.bscscan.com/tx" },
  // 56: { txExplorer: "https://bscscan.com/tx" },
  "juno-1": { txExplorer: "https://www.mintscan.io/juno/txs" },
  "uni-5": { txExplorer: "https://testnet.mintscan.io/juno-testnet/txs" },
  "phoenix-1": { txExplorer: "https://finder.terra.money/mainnet/tx" },
  "pisco-1": { txExplorer: "https://finder.terra.money/testnet/tx" },
};

export const chains: { [index: string]: Info } = new Proxy(_chains, {
  get(target, key: chainIDs) {
    return target[key] ?? { txExplorer: "https://app.angelprotocol.io" }; //TODO: what's good fallback link
  },
});
