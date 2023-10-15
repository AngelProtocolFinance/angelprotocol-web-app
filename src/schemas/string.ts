import * as Yup from "yup";
import { ChainID } from "types/chain";
import { logger } from "helpers";

export const junoAddrPattern = /^juno1[a-z0-9]{38,58}$/i;
export const terraAddrPattern = /^terra1[a-z0-9]{38}$/i;
const evmAddrPattern = /^0x[a-fA-F0-9]{40}$/;

export const requiredString = Yup.string().required("required");

export const walletAddr = (chainId: ChainID) =>
  Yup.lazy((val) =>
    val === ""
      ? Yup.string()
      : Yup.string().matches(
          walletAddrPatten(chainId),
          "wallet address not valid"
        )
  );

export const requiredWalletAddr = (chainId: ChainID) => {
  return requiredString.matches(walletAddrPatten(chainId), `invalid address`);
};

export const url = Yup.string()
  .nullable()
  .test({
    name: "URL with(out) the HTTP(S) schema",
    message: "invalid url",
    test: (str: string | null | undefined) => {
      // URL must be nullable
      if (!str) {
        return true;
      }

      // if the string contains only non-alphanumerical characters, the URL is invalid
      if (new RegExp("^[^a-zA-Z0-9]+$").test(str)) {
        return false;
      }

      // if the string only contains the schema, the URL is invalid
      if (new RegExp(/^https?:\/\/?$/).test(str)) {
        return false;
      }

      let givenURL;
      try {
        // first check if this is a valid URL at all using any schema
        givenURL = new URL(str);
      } catch (error) {
        logger.info("Original URL is ", str);
        try {
          // check if prepending http would result in a valid URL
          givenURL = new URL(`http://${str}`);
        } catch (error) {
          logger.error("Error is", error);
          return false;
        }
      }
      return givenURL.protocol === "http:" || givenURL.protocol === "https:";
    },
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

export function walletAddrPatten(chainId: ChainID) {
  switch (chainId) {
    case "1":
    case "5":
    case "56":
    case "97":
    case "137":
    case "80001":
      return evmAddrPattern;
    case "pisco-1":
    case "phoenix-1":
      return terraAddrPattern;
    case "juno-1":
    case "uni-6":
      return junoAddrPattern;
    default:
      const x: never = chainId;
      throw new Error(`unhandled ${x}`);
  }
}
