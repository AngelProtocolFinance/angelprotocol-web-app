import { ProviderId } from "../types";

export default function isTerraProvider(providerId: ProviderId) {
  switch (providerId) {
    //FUTURE: add other leap falcon etc
    case "station":
    case "walletconnect":
    case "xdefi-wallet":
      return true;
    default:
      return false;
  }
}

export function isEIPprovider(providerId: ProviderId) {
  switch (providerId) {
    //FUTURE: add other leap falcon etc
    case "metamask":
    case "xdefi-wallet":
    case "binance-wallet":
      return true;
    default:
      return false;
  }
}
