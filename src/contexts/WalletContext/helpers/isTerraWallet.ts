import { ProviderId } from "../types";

export default function isTerraWallet(providerId?: ProviderId) {
  switch (providerId) {
    //FUTURE: add other leap falcon etc
    case "terra-station":
    case "xdefi":
    case "wallet-connect":
      return true;
    default:
      return false;
  }
}
