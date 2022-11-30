export enum chainIDs {
  junoMain = "juno-1",
  junoTest = "uni-5",
  binanceMain = "56",
  binanceTest = "97",
  ethMain = "1",
  ethTest = "5",
  terraMain = "phoenix-1",
  terraTest = "pisco-1",
  //add axelar, connext
}

type Info = { txExplorer: string };

const explorers: { [key in chainIDs]: string } = {
  1: "https://etherscan.io",
  5: "https://goerli.etherscan.io",
  97: "https://testnet.bscscan.com",
  56: "https://bscscan.com",
  "juno-1": "https://www.mintscan.io/juno",
  "uni-5": "https://testnet.mintscan.io/juno-testnet",
  "phoenix-1": "https://finder.terra.money/mainnet",
  "pisco-1": "https://finder.terra.money/testnet",
};

const _chains: { [key in chainIDs]: Info } = {
  1: { txExplorer: `${explorers[1]}/tx` },
  5: { txExplorer: `${explorers[5]}/tx` },
  97: { txExplorer: `${explorers[97]}/tx` },
  56: { txExplorer: `${explorers[56]}/tx` },
  "juno-1": { txExplorer: `${explorers["juno-1"]}/txs` },
  "uni-5": { txExplorer: `${explorers["uni-5"]}/txs` },
  "phoenix-1": { txExplorer: `${explorers["phoenix-1"]}/tx` },
  "pisco-1": { txExplorer: `${explorers["pisco-1"]}/tx` },
};

export const chains: { [index: string]: Info } = new Proxy(_chains, {
  get(target, key: chainIDs) {
    return target[key] ?? { txExplorer: "https://app.angelprotocol.io" }; //TODO: what's good fallback link
  },
});
