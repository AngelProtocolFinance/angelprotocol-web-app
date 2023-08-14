import { ObjectSchema, date, mixed, object, string } from "yup";
import { FV, TPermission } from "./types";
import { SchemaShape } from "schemas/types";
import { requiredWalletAddr } from "schemas/string";
import { chainIds } from "constants/chainIds";

const _delegated: keyof TPermission = "delegated";
const _expires: keyof TPermission = "expires";

const fieldShape: SchemaShape<TPermission> = {
  addr: string().when(_delegated, {
    is: true,
    then: () => requiredWalletAddr(chainIds.polygon),
    otherwise: (schema) => schema.optional(),
  }),
  expiry: mixed().when(_expires, {
    is: true,
    then: () =>
      date().typeError("invalid date").min(new Date(), "must be in the future"),
    otherwise: () => string(),
  }),
};

export const schema = object<any, SchemaShape<FV>>({
  accountFees: object(fieldShape),
  allowList: object(fieldShape),
  donationSplitParams: object(fieldShape),
  profile: object(fieldShape),
}) as ObjectSchema<FV>;
