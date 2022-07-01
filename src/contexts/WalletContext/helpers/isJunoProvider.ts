import { ProviderId } from "../types";

export default function isTerraProvider(providerId: ProviderId) {
  switch (providerId) {
    //FUTURE: add other leap falcon xdefi etc
    case "keplr":
    case "walletconnect":
      return true;
    default:
      return false;
  }
}
