import * as Yup from "yup";
import { SchemaShape } from "schemas/types";
import { SettingsPermission } from "types/contracts";
import { requiredWalletAddr } from "schemas/string";

export type FormField = Omit<SettingsPermission, "delegate"> & {
  name: string;
  delegated: boolean;
  delegate_address: string;
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
  endowment_controller: FormField;
};

const deledatedKey: keyof FormField = "delegated";

const fieldShape: SchemaShape<FormField> = {
  delegate_address: Yup.string().when(
    deledatedKey,
    (delegate: FormField["delegated"], schema) =>
      delegate ? requiredWalletAddr() : schema.optional()
  ),
};
const shape: SchemaShape<FormValues> = {
  accountFees: Yup.object().shape(fieldShape),
  beneficiaries_allowlist: Yup.object().shape(fieldShape),
  contributors_allowlist: Yup.object().shape(fieldShape),
  donationSplitParams: Yup.object().shape(fieldShape),
  profile: Yup.object().shape(fieldShape),
};

export const schema = Yup.object(shape);
