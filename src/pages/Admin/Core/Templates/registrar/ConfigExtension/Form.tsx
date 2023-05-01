import { FormValues as FV } from "./types";
import { FormContainer, GroupContainer, Submitter } from "components/admin";
import { Field, Label } from "components/form";
import useConfigureRegistrar from "./useConfigureRegistrar";

export default function Form() {
  const { configureRegistrar, isSubmitDisabled } = useConfigureRegistrar();

  return (
    <FormContainer onSubmit={configureRegistrar}>
      <Field<FV>
        classes="field-admin"
        label="Proposal title"
        name="title"
        required
      />
      <Field<FV, "textarea">
        type="textarea"
        classes="field-admin"
        label="Proposal description"
        name="description"
        required
      />
      <Label className="-mb-4 font-bold">Latest contract factories</Label>
      <GroupContainer>
        <Field<FV>
          classes="field-admin-sec"
          label="Multisig"
          name="multisigFactory"
        />
        <Field<FV>
          classes="field-admin-sec"
          label="Subdao Bonding Token"
          name="subdaoBondingTokenCode"
        />
        <Field<FV>
          classes="field-admin-sec"
          label="Subdao CW20 Token"
          name="subdaoCw20TokenCode"
        />
        <Field<FV>
          classes="field-admin-sec"
          label="Subdao CW900"
          name="subdaoCw900Code"
        />
        <Field<FV>
          classes="field-admin-sec"
          label="Subdao Distributor"
          name="subdaoDistributorCode"
        />
        <Field<FV>
          classes="field-admin-sec"
          label="Subdao Gov"
          name="subdaoGovCode"
        />
      </GroupContainer>

      <Label className="-mb-4 font-bold">Contract Directory</Label>
      <GroupContainer>
        <Field<FV>
          classes="field-admin-sec"
          label="Accounts"
          name="accountsContract"
        />
        <Field<FV>
          classes="field-admin-sec"
          label="Applications Review"
          name="applicationsReview"
        />
        <Field<FV>
          classes="field-admin-sec"
          label="Donation Match"
          name="donationMatchCharitesContract"
        />
        <Field<FV>
          classes="field-admin-sec"
          label="Fundraising"
          name="fundraisingContract"
        />
        <Field<FV>
          classes="field-admin-sec"
          label="Index fund"
          name="indexFundContract"
        />
        <Field<FV>
          classes="field-admin-sec"
          label="Governance"
          name="govContract"
        />
        <Field<FV>
          classes="field-admin-sec"
          label="Halo Token LP"
          name="haloTokenLpContract"
        />
        <Field<FV>
          classes="field-admin-sec"
          label="Halo Token"
          name="haloToken"
        />
        <Field<FV>
          classes="field-admin-sec"
          label="Swaps Router"
          name="swapsRouter"
        />
      </GroupContainer>

      <Submitter type="submit" _classes="mt-4" disabled={isSubmitDisabled}>
        Submit
      </Submitter>
    </FormContainer>
  );
}
