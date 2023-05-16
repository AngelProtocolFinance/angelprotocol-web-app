import * as Yup from "yup";
import { SchemaShape } from "schemas/types";
import { SettingsControllerUpdate, SettingsPermission } from "types/contracts";
import { requiredWalletAddr } from "schemas/string";
import { chainIds } from "constants/chainIds";

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
  initial: SettingsControllerUpdate;
  endowment_controller: FormField;
};

const delegatedKey: keyof FormField = "delegated";
const govControlledKey: keyof FormField = "govControlled";

const fieldShape: SchemaShape<FormField> = {
  delegate_address: Yup.string().when(delegatedKey, {
    is: true,
    then: requiredWalletAddr(chainIds.polygon),
    otherwise: (schema) => schema.optional(),
  }),
  // it is sufficient to validate only `ownerControlled` field, since the way the validation is defined
  // makes it necessary for the user to check either `govControlled` or `ownerControlled` to make the form valid.
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

const shape: SchemaShape<FormValues> = {
  accountFees: Yup.object().shape(fieldShape),
  beneficiaries_allowlist: Yup.object().shape(fieldShape),
  contributors_allowlist: Yup.object().shape(fieldShape),
  donationSplitParams: Yup.object().shape(fieldShape),
  profile: Yup.object().shape(fieldShape),
};

export const schema = Yup.object(shape);
