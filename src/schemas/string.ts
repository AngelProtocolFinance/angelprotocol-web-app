import type { Chain } from "types/chain";
import * as Yup from "yup";

export const junoAddrPattern = /^juno1[a-z0-9]{38,58}$/i;
export const stargazeAddrPattern = /^stars1[a-z0-9]{38,58}$/i;
export const kujiraAddrPattern = /^kujira1[a-z0-9]{38,58}$/i;
export const osmosisAddrPattern = /^osmo1[a-z0-9]{38,58}$/i;
export const terraAddrPattern = /^terra1[a-z0-9]{38}$/i;
export const alphanumeric = /^[0-9a-zA-Z]+$/;
const evmAddrPattern = /^0x[a-fA-F0-9]{40}$/;

export const requiredString = Yup.string().required("required");

export const walletAddr = (chainId: Chain.Id.Tier1) =>
  Yup.lazy((val) =>
    val === ""
      ? Yup.string()
      : Yup.string()
          .trim()
          .matches(walletAddrPattern(chainId), "wallet address not valid")
  );

export const url = Yup.string()
  .trim()
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

export const segment = Yup.string()
  .trim()
  .test("not-id", "should not be an id", (v) =>
    v ? /^(?!^\d+$)/.test(v) : true
  )
  .test("valid-char", "invalid segment", (v) =>
    v ? /^[a-zA-Z0-9-._~]+$/.test(v) : true
  )
  .test("no double period", "invalid segment", (v) => !v?.includes(".."))
  .test(
    "no-starting-ending-period",
    "invalid segment",
    (v) => !v?.startsWith(".") && !v?.endsWith(".")
  );

export function walletAddrPattern(chainId: Chain.Id.Tier1) {
  switch (chainId) {
    case "1":
    case "11155111":
    case "56":
    case "97":
    case "137":
    case "42161":
    case "80002":
    case "421614":
    case "10":
    case "11155420":
    case "8453":
    case "84532":
      return evmAddrPattern;
    case "pisco-1":
    case "phoenix-1":
      return terraAddrPattern;
    case "juno-1":
    case "uni-6":
      return junoAddrPattern;
    case "kaiyo-1":
    case "harpoon-4":
      return kujiraAddrPattern;
    case "stargaze-1":
    case "elgafar-1":
      return stargazeAddrPattern;
    case "osmosis-1":
    case "osmo-test-5":
      return osmosisAddrPattern;
    default:
      const x: never = chainId;
      throw new Error(`unhandled ${x}`);
  }
}

export const password = requiredString
  .min(8, ({ min }) => `must have at least ${min} characters`)
  .matches(/[a-z]/, "must have lowercase letters")
  .matches(/[A-Z]/, "must have uppercase letters")
  .matches(/\d/, "must have numbers")
  .matches(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/, "must have special characters");
