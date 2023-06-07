import * as Yup from "yup";
import { SchemaShape } from "schemas/types";
import { Delegate, SettingsControllerUpdate } from "types/contracts";
import { requiredWalletAddr } from "schemas/string";
import { chainIds } from "constants/chainIds";

export type FormField = Pick<Delegate, "addr"> & {
  isActive: boolean;
  locked: boolean;

  //meta
  name: string;
  modifiable: boolean;
  ownerControlled: boolean;
  govControlled: boolean;
};

export type UpdateableFormValues = {
  accountFees: FormField;
  allowList: FormField;
  donationSplitParams: FormField;
  profile: FormField;
};

export type FormValues = UpdateableFormValues & {
  initial: SettingsControllerUpdate;
};

const _active: keyof FormField = "isActive";

const fieldShape: SchemaShape<FormField> = {
  addr: Yup.string().when(_active, {
    is: true,
    then: requiredWalletAddr(chainIds.polygon),
    otherwise: (schema) => schema.optional(),
  }),
};

const shape: SchemaShape<FormValues> = {
  accountFees: Yup.object().shape(fieldShape),
  allowList: Yup.object().shape(fieldShape),
  donationSplitParams: Yup.object().shape(fieldShape),
  profile: Yup.object().shape(fieldShape),
};

export const schema = Yup.object(shape);
