import { RegistrarConfigValues as RV } from "pages/Admin/types";
import {
  FormContainer,
  GroupContainer,
  Submitter,
  TextArea,
} from "components/admin";
import { Label, TextInput } from "components/form";
import useConfigureRegistrar from "./useConfigureRegistrar";

export default function Form() {
  const { configureRegistrar, isSubmitDisabled } = useConfigureRegistrar();

  return (
    <FormContainer onSubmit={configureRegistrar}>
      <TextInput<RV>
        classes="field-group-admin"
        label="Proposal title"
        name="title"
        required
      />
      <TextArea<RV> label="Proposal description" name="description" required />
      <Label className="-mb-4 font-bold">Latest accounts wasm code</Label>
      <GroupContainer>
        <TextInput<RV>
          classes="field-group-admin-sec"
          label="Accounts code id"
          name="accounts_code_id"
        />
      </GroupContainer>

      <Label className="-mb-4 font-bold">Default Donation splits</Label>
      <GroupContainer>
        <TextInput<RV>
          classes="field-group-admin-sec"
          label="Tax rate ( % )"
          name="tax_rate"
        />
        <TextInput<RV>
          classes="field-group-admin-sec"
          label="Default vault"
          name="default_vault"
        />
      </GroupContainer>

      <Label className="-mb-4 font-bold">Vault Setting</Label>
      <GroupContainer>
        <TextInput<RV>
          classes="field-group-admin-sec"
          label="Min liquid split ( % )"
          name="split_min"
        />
        <TextInput<RV>
          classes="field-group-admin-sec"
          label="Max liquid split ( % )"
          name="split_max"
        />
        <TextInput<RV>
          classes="field-group-admin-sec"
          label="Default max liquid split ( % )"
          name="split_default"
        />
      </GroupContainer>

      <Label className="-mb-4 font-bold">Contract Directory</Label>
      <GroupContainer>
        <TextInput<RV>
          classes="field-group-admin-sec"
          label="Index fund"
          name="index_fund_contract"
        />
        <TextInput<RV>
          classes="field-group-admin-sec"
          label="Treasury"
          name="treasury"
        />
        <TextInput<RV>
          classes="field-group-admin-sec"
          label="Guardians"
          name="guardians_multisig_addr"
        />
        <TextInput<RV>
          classes="field-group-admin-sec"
          label="Endowment owners"
          name="endowment_owners_group_addr"
        />
        <TextInput<RV>
          classes="field-group-admin-sec"
          label="Halo"
          name="halo_token"
        />
        <TextInput<RV>
          classes="field-group-admin-sec"
          label="Governance"
          name="gov_contract"
        />
        <TextInput<RV>
          classes="field-group-admin-sec"
          label="Charity shares"
          name="charity_shares_contract"
        />
      </GroupContainer>

      <Submitter type="submit" _classes="mt-4" disabled={isSubmitDisabled}>
        Submit
      </Submitter>
    </FormContainer>
  );
}
