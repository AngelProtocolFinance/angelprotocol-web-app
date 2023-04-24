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

const delegatedKey: keyof FormField = "delegated";
const ownerControlledKey: keyof FormField = "ownerControlled";
const govControlledKey: keyof FormField = "govControlled";

const fieldShape: SchemaShape<FormField> = {
  delegate_address: Yup.string().when(delegatedKey, {
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
    otherwise: (schema) =>
      schema.isTrue(
        "Please give permissions to either Admin Wallet or Governance"
      ),
  }),
  ownerControlled: Yup.boolean().when(govControlledKey, {
    is: true,
    then: (schema) =>
      schema.isFalse(
        "Cannot give permissions to both Admin Wallet and Governance"
      ),
    otherwise: (schema) =>
      schema.isTrue(
        "Please give permissions to either Admin Wallet or Governance"
      ),
  }),
};

/**
 * Defined fields that have cyclical validation dependency to pass.
 * For more details see https://github.com/jquense/yup/issues/176#issuecomment-367352042
 */
const excludes: [string, string][] = [[govControlledKey, ownerControlledKey]];

const shape: SchemaShape<FormValues> = {
  accountFees: Yup.object().shape(fieldShape, excludes),
  beneficiaries_allowlist: Yup.object().shape(fieldShape, excludes),
  contributors_allowlist: Yup.object().shape(fieldShape, excludes),
  donationSplitParams: Yup.object().shape(fieldShape, excludes),
  profile: Yup.object().shape(fieldShape, excludes),
};

export const schema = Yup.object(shape);
