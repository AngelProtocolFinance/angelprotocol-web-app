import { TERRA_FINDER } from "constants/urls";

export default function getFinderUrl(chainID: string, txhash: string) {
  return `${TERRA_FINDER}${chainID}/tx/${txhash}`;
}
