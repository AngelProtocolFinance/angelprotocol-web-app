import * as Yup from "yup";
import { chainIds } from "constants/chainIds";

export const junoAddrPattern = /^juno1[a-z0-9]{38,58}$/i;
export const terraAddrPattern = /^terra1[a-z0-9]{38}$/i;
export const junoContractAddrPattern = /^juno1[a-z0-9]{58}$/i;
export const evmAddrPattern = /^0x[a-fA-F0-9]{40}$/;

export const requiredString = Yup.string().required("required");

export const contractAddr = Yup.string().matches(
  junoContractAddrPattern,
  "contract address not valid"
);
export const requiredContractAddr = requiredString.matches(
  junoContractAddrPattern,
  "address format is not valid"
);

export const walletAddr = (network: string = chainIds.juno) =>
  Yup.lazy((val) =>
    val === ""
      ? Yup.string()
      : Yup.string().matches(
          getWalletAddrPattern(network),
          "wallet address not valid"
        )
  );

export const requiredWalletAddr = (network: string = chainIds.juno) => {
  return requiredString.matches(
    getWalletAddrPattern(network),
    `wallet address not valid`
  );
};

export const url = Yup.string()
  .nullable()
  .when({
    is: (value: string) => !!value && !/https?:\/\//.test(value),
    then: Yup.string().test({
      name: "URL without the HTTP(S) schema",
      message: "invalid url",
      test: (value) => {
        try {
          new URL(`http://${value}`);
          return true;
        } catch (_) {
          return false;
        }
      },
    }),
    otherwise: Yup.string().url("invalid url"),
  });

export const stringByteSchema = (minBytes: number, maxBytes: number) =>
  Yup.string()
    .required(`required`)
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
      return evmAddrPattern;
    default:
      return junoAddrPattern;
  }
}
