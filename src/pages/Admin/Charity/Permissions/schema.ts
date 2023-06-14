import * as Yup from "yup";
import { FV, TPermission } from "./types";
import { SchemaShape } from "schemas/types";
import { requiredWalletAddr } from "schemas/string";
import { chainIds } from "constants/chainIds";

const _active: keyof TPermission = "isActive";

const fieldShape: SchemaShape<TPermission> = {
  addr: Yup.string().when(_active, {
    is: true,
    then: requiredWalletAddr(chainIds.polygon),
    otherwise: (schema) => schema.optional(),
  }),
};

const shape: SchemaShape<FV> = {
  accountFees: Yup.object().shape(fieldShape),
  allowList: Yup.object().shape(fieldShape),
  donationSplitParams: Yup.object().shape(fieldShape),
  profile: Yup.object().shape(fieldShape),
};

export const schema = Yup.object(shape);
