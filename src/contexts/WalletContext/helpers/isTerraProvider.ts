import { ProviderId } from "../types";

export default function isTerraProvider(providerId: ProviderId) {
  switch (providerId) {
    //FUTURE: add other leap falcon etc
    case "station":
    case "walletconnect":
    case "xdefi-wallet":
    case "torus":
      return true;
    default:
      return false;
  }
}
