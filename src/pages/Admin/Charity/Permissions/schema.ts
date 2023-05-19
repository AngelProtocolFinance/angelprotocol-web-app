import * as Yup from "yup";
import { SchemaShape } from "schemas/types";
import { Delegate } from "types/contracts";
import { requiredWalletAddr } from "schemas/string";
import { chainIds } from "constants/chainIds";

export type FormField = Pick<Delegate, "addr"> & {
  name: string;
  isActive: boolean;

  //meta
  ownerControlled: boolean;
  govControlled: boolean;
  modifiableAfterInit: boolean;
};

export type UpdateableFormValues = {
  accountFees: FormField;
  beneficiaries_allowlist: FormField;
  contributors_allowlist: FormField;
  donationSplitParams: FormField;
  profile: FormField;
};

export type FormValues = UpdateableFormValues & {
  initialValues: UpdateableFormValues;
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
  beneficiaries_allowlist: Yup.object().shape(fieldShape),
  contributors_allowlist: Yup.object().shape(fieldShape),
  donationSplitParams: Yup.object().shape(fieldShape),
  profile: Yup.object().shape(fieldShape),
};

export const schema = Yup.object(shape);
