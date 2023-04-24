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
const ownerControlledKey: keyof FormField = "ownerControlled";
const govControlledKey: keyof FormField = "govControlled";

const fieldShape: SchemaShape<FormField> = {
  delegated: Yup.boolean().when([ownerControlledKey, govControlledKey], {
    is: (
      ownerControlled: FormField["ownerControlled"],
      govControlled: FormField["govControlled"]
    ) => !ownerControlled && !govControlled,
    then: (schema) =>
      schema.isFalse("Cannot give permissions only to Delegate wallet"),
    otherwise: (schema) => schema.optional(),
  }),
  delegate_address: Yup.string().when(deledatedKey, {
    is: true,
    then: requiredWalletAddr(),
    otherwise: (schema) => schema.optional(),
  }),
  govControlled: Yup.boolean().when(ownerControlledKey, {
    is: true,
    then: (schema) =>
      schema.isFalse(
        "Cannot give permissions to both Admin Wallet and Governance"
      ),
    otherwise: (schema) => schema.optional(),
  }),
  ownerControlled: Yup.boolean().when(govControlledKey, {
    is: true,
    then: (schema) =>
      schema.isFalse(
        "Cannot give permissions to both Admin Wallet and Governance"
      ),
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
