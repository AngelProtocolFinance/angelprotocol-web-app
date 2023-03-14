import { RegistrarConfigExtensionValues as RV } from "pages/Admin/types";
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
        <Field<RV> classes="field-admin-sec" label="CW3" name="cw3_code" />
        <Field<RV> classes="field-admin-sec" label="CW4" name="cw4_code" />
        <Field<RV>
          classes="field-admin-sec"
          label="Donation Matching"
          name="donation_match_code"
        />
        <Field<RV>
          classes="field-admin-sec"
          label="Subdao Bonding Token"
          name="subdao_bonding_token_code"
        />
        <Field<RV>
          classes="field-admin-sec"
          label="Subdao CW20 Token"
          name="subdao_cw20_token_code"
        />
        <Field<RV>
          classes="field-admin-sec"
          label="Subdao CW900"
          name="subdao_cw900_code"
        />
        <Field<RV>
          classes="field-admin-sec"
          label="Subdao Distributor"
          name="subdao_distributor_code"
        />
        <Field<RV>
          classes="field-admin-sec"
          label="Subdao Gov"
          name="subdao_gov_code"
        />
      </GroupContainer>

      <Label className="-mb-4 font-bold">Contract Directory</Label>
      <GroupContainer>
        <Field<RV>
          classes="field-admin-sec"
          label="Accounts"
          name="accounts_contract"
        />
        <Field<RV>
          classes="field-admin-sec"
          label="Accounts Settings Controller"
          name="accounts_settings_controller"
        />
        <Field<RV>
          classes="field-admin-sec"
          label="Applications Review"
          name="applications_review"
        />
        <Field<RV>
          classes="field-admin-sec"
          label="Charity Shares"
          name="charity_shares_contract"
        />
        <Field<RV>
          classes="field-admin-sec"
          label="Collector"
          name="collector_addr"
        />
        <Field<RV>
          classes="field-admin-sec"
          label="Donation Match"
          name="donation_match_charites_contract"
        />
        <Field<RV>
          classes="field-admin-sec"
          label="Fundraising"
          name="fundraising_contract"
        />
        <Field<RV>
          classes="field-admin-sec"
          label="Index fund"
          name="index_fund_contract"
        />
        <Field<RV>
          classes="field-admin-sec"
          label="Governance"
          name="gov_contract"
        />
        <Field<RV>
          classes="field-admin-sec"
          label="Halo Token LP"
          name="halo_token_lp_contract"
        />
        <Field<RV>
          classes="field-admin-sec"
          label="Halo Token"
          name="halo_token"
        />
        <Field<RV>
          classes="field-admin-sec"
          label="Index Fund"
          name="index_fund_contract"
        />
        <Field<RV>
          classes="field-admin-sec"
          label="Swap Factory"
          name="swap_factory"
        />
        <Field<RV>
          classes="field-admin-sec"
          label="Swaps Router"
          name="swaps_router"
        />
        <Field<RV> classes="field-admin-sec" label="Halo" name="halo_token" />
      </GroupContainer>

      <Submitter type="submit" _classes="mt-4" disabled={isSubmitDisabled}>
        Submit
      </Submitter>
    </FormContainer>
  );
}
