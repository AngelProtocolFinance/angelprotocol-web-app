import * as Yup from "yup";
import { logger } from "helpers";
import { chainIds } from "constants/chainIds";

export const junoAddrPattern = /^juno1[a-z0-9]{38,58}$/i;
export const terraAddrPattern = /^terra1[a-z0-9]{38}$/i;
const evmAddrPattern = /^0x[a-fA-F0-9]{40}$/;

export const requiredString = Yup.string().required("required");

export const walletAddr = (network: string = chainIds.juno) =>
  Yup.lazy((val) =>
    val === ""
      ? Yup.string()
      : Yup.string().matches(
          getWalletAddrPattern(network),
          "wallet address not valid"
        )
  );

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

function getWalletAddrPattern(network: string) {
  switch (network) {
    case chainIds.binance:
    case chainIds.ethereum:
    case chainIds.polygon:
      return evmAddrPattern;
    case chainIds.terra:
      return terraAddrPattern;
    default:
      return junoAddrPattern;
  }
}
