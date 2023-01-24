import * as Yup from "yup";
import { chainIds } from "constants/chains";

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

// if the regex match validation is not applied conditionally, it wouldn't allow for empty strings/nulls to pass through
// to other matchers (like `required()`) as it would always be a required field
export const url = Yup.string()
  .when({
    is: (value: string) => !!value,
    then: (schema) =>
      schema.matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "invalid url"
      ),
  })
  .nullable();

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
