import { ProviderId } from "../types";

export default function isTerraProvider(providerId: ProviderId) {
  switch (providerId) {
    //FUTURE: add other leap falcon etc
    case "station":
    case "xdefi":
    case "wallet-connect":
      return true;
    default:
      return false;
  }
}
