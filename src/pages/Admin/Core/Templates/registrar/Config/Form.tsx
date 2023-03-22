import { RegistrarConfigValues as RV } from "pages/Admin/types";
import { FormContainer, GroupContainer, Submitter } from "components/admin";
import { Field, Label } from "components/form";
import useConfigureRegistrar from "./useConfigureRegistrar";

export default function Form() {
  const { configureRegistrar, isSubmitDisabled } = useConfigureRegistrar();

  return (
    <FormContainer onSubmit={configureRegistrar}>
      <Field<RV>
        classes="field-admin"
        label="Proposal title"
        name="title"
        required
      />
      <Field<RV, "textarea">
        type="textarea"
        classes="field-admin"
        label="Proposal description"
        name="description"
        required
      />
      <Label className="-mb-4 font-bold">Latest wasm codes</Label>
      <GroupContainer>
        <Field<RV> classes="field-admin-sec" label="CW3 Code" name="cw3_code" />
        <Field<RV> classes="field-admin-sec" label="CW4 Code" name="cw4_code" />
      </GroupContainer>

      <Label className="-mb-4 font-bold">Vault Setting</Label>
      <GroupContainer>
        <Field<RV>
          classes="field-admin-sec"
          label="Min liquid split ( % )"
          name="split_min"
        />
        <Field<RV>
          classes="field-admin-sec"
          label="Max liquid split ( % )"
          name="split_max"
        />
        <Field<RV>
          classes="field-admin-sec"
          label="Default max liquid split ( % )"
          name="split_default"
        />
      </GroupContainer>

      <Label className="-mb-4 font-bold">Contract Directory</Label>
      <GroupContainer>
        <Field<RV>
          classes="field-admin-sec"
          label="Index fund"
          name="index_fund_contract"
        />
        <Field<RV> classes="field-admin-sec" label="Treasury" name="treasury" />
        <Field<RV>
          classes="field-admin-sec"
          label="Accounts"
          name="accounts_contract"
        />
        <Field<RV>
          classes="field-admin-sec"
          label="Charity Applications Review"
          name="applications_review"
        />
        <Field<RV>
          classes="field-admin-sec"
          label="Impact Applications Review"
          name="applications_impact_review"
        />
        <Field<RV>
          classes="field-admin-sec"
          label="Swaps Router"
          name="swaps_router"
        />
        <Field<RV> classes="field-admin-sec" label="Halo" name="halo_token" />
        <Field<RV>
          classes="field-admin-sec"
          label="Governance"
          name="gov_contract"
        />
        <Field<RV>
          classes="field-admin-sec"
          label="Charity Shares"
          name="charity_shares_contract"
        />
      </GroupContainer>

      <Label className="-mb-4 font-bold">
        Accepted Tokens (comma separated list of values)
      </Label>
      <GroupContainer>
        <Field<RV>
          classes="field-admin-sec"
          label="Native Tokens"
          name="accepted_tokens_native"
        />
        <Field<RV>
          classes="field-admin-sec"
          label="CW20 Tokens"
          name="accepted_tokens_cw20"
        />
      </GroupContainer>

      <Submitter type="submit" _classes="mt-4" disabled={isSubmitDisabled}>
        Submit
      </Submitter>
    </FormContainer>
  );
}
