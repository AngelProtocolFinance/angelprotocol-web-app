import * as Yup from "yup";
import { AddrNetwork } from "./types";

export const contractAddr = Yup.string().matches(
  /^juno1[a-z0-9]{58}$/i,
  "contract address not valid"
);
export const requiredContractAddr = Yup.string()
  .required("required")
  .matches(/^juno1[a-z0-9]{58}$/i, "address format is not valid");

export const walletAddr = (network: AddrNetwork = "juno") =>
  Yup.string().matches(
    getWalletAddrPattern(network),
    "wallet address not valid"
  );
export const requiredWalletAddr = (network: AddrNetwork = "juno") => {
  return Yup.string()
    .required("required")
    .matches(getWalletAddrPattern(network), `wallet address not valid`);
};

export const url = Yup.string().url("invalid url").nullable();

export const stringByteSchema = (
  title: string,
  minBytes: number,
  maxBytes: number
) =>
  Yup.string()
    .required(`${title} is required`)
    .test(
      "min_length",
      `${title} is too short`,
      getBytesComparer("gt", minBytes)
    )
    .test(
      "max_length",
      `${title} is too long`,
      getBytesComparer("lt", maxBytes)
    );

function getBytesComparer(comparison: "gt" | "lt", num_bytes: number) {
  return function (str?: string) {
    if (comparison === "gt") {
      return new Blob([str || ""]).size > num_bytes;
    } else {
      return new Blob([str || ""]).size <= num_bytes;
    }
  };
}

function getWalletAddrPattern(network: AddrNetwork) {
  switch (network) {
    case "bnb":
    case "eth":
      return /^0x[a-fA-F0-9]{40}$/;
    default:
      return /^juno1[a-z0-9]{38,58}$/i;
  }
}
