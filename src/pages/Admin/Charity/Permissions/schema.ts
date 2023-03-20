import * as Yup from "yup";
import { SchemaShape } from "schemas/types";
import { SettingsPermissions } from "types/contracts";
import { requiredWalletAddr } from "schemas/string";

export type FormField = Omit<SettingsPermissions, "delegate"> & {
  name: string;
} & (
    | { delegate: true; delegate_address: string }
    | { delegate: false; delegate_address: "" }
  );

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

const deledateKey: keyof FormField = "delegate";

const fieldShape: SchemaShape<FormField> = {
  delegate_address: Yup.string().when(
    deledateKey,
    (delegate: FormField["delegate"], schema) =>
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
