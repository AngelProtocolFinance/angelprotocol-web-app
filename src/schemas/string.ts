import { ChainID } from "types/chain";
import * as Yup from "yup";

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
          "wallet address not valid",
        ),
  );

export const url = Yup.string()
  /** though our validation library also supports http and ftp,
   * Our use case is fairly limited to user giving us links to their social media or website
   * which is widespread to be on https.
   *
   * Moreover, we are expecting donors to click these links.
   *  */
  .transform((str?: string) => (str || "").replace(/^(http|ftp):\/\//, "_")) //send an invalid value to parser
  .url(({ value }) => {
    //only check for https as http and ftp are filtered out
    if (!/^https:\/\//.test(value)) return "should start with https://";
    if (value === "https://") return "incomplete url";
    return "invalid url";
  });

export function walletAddrPatten(chainId: ChainID) {
  switch (chainId) {
    case "1":
    case "5":
    case "56":
    case "97":
    case "137":
    case "42161":
    case "80001":
    case "421614":
      return evmAddrPattern;
    case "pisco-1":
    case "phoenix-1":
      return terraAddrPattern;
    case "juno-1":
    case "uni-6":
      return junoAddrPattern;
    default: {
      const x: never = chainId;
      throw new Error(`unhandled ${x}`);
    }
  }
}
