import { RegistrarConfigValues as RV } from "pages/Admin/types";
import {
  FormContainer,
  GroupContainer,
  Submitter,
  TextArea,
  TextPrim,
  TextSec,
} from "components/admin";
import { Label } from "components/form";
import useConfigureRegistrar from "./useConfigureRegistrar";

export default function Form() {
  const { configureRegistrar, isSubmitDisabled } = useConfigureRegistrar();

  return (
    <FormContainer onSubmit={configureRegistrar}>
      <TextPrim<RV> label="Proposal title" name="title" required />
      <TextArea<RV> label="Proposal description" name="description" required />
      <Label className="-mb-4 font-bold">Latest accounts wasm code</Label>
      <GroupContainer>
        <TextSec<RV> label="Accounts code id" name="accounts_code_id" />
      </GroupContainer>

      <Label className="-mb-4 font-bold">Default Donation splits</Label>
      <GroupContainer>
        <TextSec<RV> label="Tax rate ( % )" name="tax_rate" />
        <TextSec<RV> label="Default vault" name="default_vault" />
      </GroupContainer>

      <Label className="-mb-4 font-bold">Vault Setting</Label>
      <GroupContainer>
        <TextSec<RV> label="Min liquid split ( % )" name="split_min" />
        <TextSec<RV> label="Max liquid split ( % )" name="split_max" />
        <TextSec<RV>
          label="Default max liquid split ( % )"
          name="split_default"
        />
      </GroupContainer>

      <Label className="-mb-4 font-bold">Contract Directory</Label>
      <GroupContainer>
        <TextSec<RV> label="Index fund" name="index_fund_contract" />
        <TextSec<RV> label="Treasury" name="treasury" />
        <TextSec<RV> label="Guardians" name="guardians_multisig_addr" />
        <TextSec<RV>
          label="Endowment owners"
          name="endowment_owners_group_addr"
        />
        <TextSec<RV> label="Halo" name="halo_token" />
        <TextSec<RV> label="Governance" name="gov_contract" />
        <TextSec<RV> label="Charity shares" name="charity_shares_contract" />
      </GroupContainer>

      <Submitter type="submit" _classes="mt-4" disabled={isSubmitDisabled}>
        Submit
      </Submitter>
    </FormContainer>
  );
}
