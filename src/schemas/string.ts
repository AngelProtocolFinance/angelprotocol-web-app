import * as Yup from "yup";
import { chainIds } from "constants/chainIds";

export const requiredString = Yup.string().required("required");

export const contractAddr = Yup.string().matches(
  /^juno1[a-z0-9]{58}$/i,
  "contract address not valid"
);
export const requiredContractAddr = requiredString.matches(
  /^juno1[a-z0-9]{58}$/i,
  "address format is not valid"
);

export const walletAddr = (network: string = chainIds.juno) =>
  Yup.string().matches(
    getWalletAddrPattern(network),
    "wallet address not valid"
  );
export const requiredWalletAddr = (network: string = chainIds.juno) => {
  return requiredString.matches(
    getWalletAddrPattern(network),
    `wallet address not valid`
  );
};

export const url = Yup.string().url("invalid url").nullable();

export const stringByteSchema = (minBytes: number, maxBytes: number) =>
  requiredString
    .test("min_length", `too short`, getBytesComparer("gt", minBytes))
    .test("max_length", `too long`, getBytesComparer("lt", maxBytes));

function getBytesComparer(comparison: "gt" | "lt", num_bytes: number) {
  return function (str?: string) {
    if (comparison === "gt") {
      return new Blob([str || ""]).size > num_bytes;
    } else {
      return new Blob([str || ""]).size <= num_bytes;
    }
  };
}

function getWalletAddrPattern(network: string) {
  switch (network) {
    case chainIds.binance:
    case chainIds.ethereum:
      return /^0x[a-fA-F0-9]{40}$/;
    default:
      return /^juno1[a-z0-9]{38,58}$/i;
  }
}
