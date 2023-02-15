import { DAPP_DOMAIN } from "constants/common";

export enum chainIDs {
  junoMain = "juno-1",
  junoTest = "uni-6",
  polygonMain = "137",
  polygonTest = "80001",
  binanceMain = "56",
  binanceTest = "97",
  ethMain = "1",
  ethTest = "5",
  terraMain = "phoenix-1",
  terraTest = "pisco-1",
  //add axelar, connext
}

type Info = { txExplorer: string; addressExplorer: string };

const explorers: { [key in chainIDs]: string } = {
  1: "https://etherscan.io",
  5: "https://goerli.etherscan.io",
  97: "https://testnet.bscscan.com",
  56: "https://bscscan.com",
  137: "https://polygonscan.com",
  80001: "https://mumbai.polygonscan.com",
  "juno-1": "https://www.mintscan.io/juno",
  "uni-6": "https://testnet.mintscan.io/juno-testnet",
  "phoenix-1": "https://finder.terra.money/mainnet",
  "pisco-1": "https://finder.terra.money/testnet",
};

const _chains: { [key in chainIDs]: Info } = {
  [chainIDs.ethMain]: {
    txExplorer: `${explorers[chainIDs.ethMain]}/tx`,
    addressExplorer: `${explorers[chainIDs.ethMain]}/address`,
  },
  [chainIDs.ethTest]: {
    txExplorer: `${explorers[chainIDs.ethTest]}/tx`,
    addressExplorer: `${explorers[chainIDs.ethTest]}/address`,
  },
  [chainIDs.binanceMain]: {
    txExplorer: `${explorers[chainIDs.binanceMain]}/tx`,
    addressExplorer: `${explorers[chainIDs.binanceMain]}/address`,
  },
  [chainIDs.binanceTest]: {
    txExplorer: `${explorers[chainIDs.binanceTest]}/tx`,
    addressExplorer: `${explorers[chainIDs.binanceTest]}/address`,
  },
  [chainIDs.polygonMain]: {
    txExplorer: `${explorers[chainIDs.polygonMain]}/tx`,
    addressExplorer: `${explorers[chainIDs.polygonMain]}/address`,
  },
  [chainIDs.polygonTest]: {
    txExplorer: `${explorers[chainIDs.polygonTest]}/tx`,
    addressExplorer: `${explorers[chainIDs.polygonTest]}/address`,
  },
  [chainIDs.junoMain]: {
    txExplorer: `${explorers[chainIDs.junoMain]}/txs`,
    addressExplorer: `${explorers[chainIDs.junoMain]}/account`,
  },
  [chainIDs.junoTest]: {
    txExplorer: `${explorers[chainIDs.junoTest]}/txs`,
    addressExplorer: `${explorers[chainIDs.junoTest]}/account`,
  },
  [chainIDs.terraMain]: {
    txExplorer: `${explorers[chainIDs.terraMain]}/tx`,
    addressExplorer: `${explorers[chainIDs.terraMain]}/address`,
  },
  [chainIDs.terraTest]: {
    txExplorer: `${explorers[chainIDs.terraTest]}/tx`,
    addressExplorer: `${explorers[chainIDs.terraTest]}/address`,
  },
};

export const chains: { [index: string]: Info } = new Proxy(_chains, {
  get(target, key: chainIDs) {
    return (
      target[key] ?? {
        txExplorer: `${DAPP_DOMAIN}`,
        addressExplorer: `${DAPP_DOMAIN}`,
      }
    ); //TODO: what's good fallback link
  },
});
