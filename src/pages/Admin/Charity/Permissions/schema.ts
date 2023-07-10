import { date, mixed, object, string } from "yup";
import { FV, TPermission } from "./types";
import { SchemaShape } from "schemas/types";
import { requiredWalletAddr } from "schemas/string";
import { chainIds } from "constants/chainIds";

const _delegated: keyof TPermission = "delegated";
const _expires: keyof TPermission = "expires";

const fieldShape: SchemaShape<TPermission> = {
  addr: string().when(_delegated, {
    is: true,
    then: requiredWalletAddr(chainIds.polygon),
    otherwise: (schema) => schema.optional(),
  }),
  expiry: mixed().when(_expires, {
    is: true,
    then: date()
      .typeError("invalid date")
      .min(new Date(), "must be in the future"),
    otherwise: string(),
  }),
};

const shape: SchemaShape<FV> = {
  accountFees: object().shape(fieldShape),
  allowList: object().shape(fieldShape),
  donationSplitParams: object().shape(fieldShape),
  profile: object().shape(fieldShape),
};

export const schema = object(shape);
