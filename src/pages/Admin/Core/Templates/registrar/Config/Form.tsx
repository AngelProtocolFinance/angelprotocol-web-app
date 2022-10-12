import { RegistrarConfigValues as RV } from "pages/Admin/types";
import {
  FormContainer,
  GroupContainer,
  Label,
  Submitter,
  TextInput,
} from "components/admin";
import useConfigureRegistrar from "./useConfigureRegistrar";

export default function Form() {
  const { configureRegistrar, isSubmitDisabled } = useConfigureRegistrar();

  return (
    <FormContainer onSubmit={configureRegistrar}>
      <TextInput<RV> title="Proposal Title" name="title" required />
      <TextInput<RV>
        title="proposal description"
        name="description"
        wide
        required
      />
      <Label className="-mb-2 text-angel-grey">Latest accounts wasm code</Label>
      <GroupContainer>
        <TextInput<RV> title="accounts code id" name="accounts_code_id" plain />
      </GroupContainer>

      <Label className="-mb-2 text-angel-grey">Default Donation splits</Label>
      <GroupContainer>
        <TextInput<RV> title="tax rate ( % )" name="tax_rate" plain />
        <TextInput<RV> title="default vault" name="default_vault" plain mono />
      </GroupContainer>

      <Label className="-mb-2 text-angel-grey">Vault Setting</Label>
      <GroupContainer>
        <TextInput<RV> title="min liquid split( % )" name="split_min" plain />
        <TextInput<RV> title="max liquid split( % )" name="split_max" plain />
        <TextInput<RV>
          title="default max liquid split( % )"
          name="split_default"
          plain
        />
      </GroupContainer>

      <Label className="-mb-2 text-angel-grey">Contract Directory</Label>
      <GroupContainer>
        <TextInput<RV>
          title="index fund"
          name="index_fund_contract"
          plain
          mono
        />
        <TextInput<RV> title="treasury" name="treasury" plain mono />
        <TextInput<RV>
          title="guardians"
          name="guardians_multisig_addr"
          plain
          mono
        />
        <TextInput<RV>
          title="endowment owners"
          name="endowment_owners_group_addr"
          plain
          mono
        />
        <TextInput<RV> title="halo" name="halo_token" plain mono />
        <TextInput<RV> title="governance" name="gov_contract" plain mono />
        <TextInput<RV>
          title="charity shares"
          name="charity_shares_contract"
          plain
          mono
        />
      </GroupContainer>

      <Submitter type="submit" _classes="mt-4" disabled={isSubmitDisabled}>
        Submit
      </Submitter>
    </FormContainer>
  );
}
