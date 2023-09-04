import { FormValues as FV } from "./types";
import {
  FormContainer,
  GroupContainer,
  Submitter,
  Tooltip,
} from "components/admin";
import { Field, Label } from "components/form";
import useConfigureRegistrar from "./useConfigureRegistrar";

export default function Form() {
  const { configureRegistrar, isSubmitDisabled, tooltip } =
    useConfigureRegistrar();

  return (
    <FormContainer onSubmit={configureRegistrar} aria-disabled={!!tooltip}>
      {tooltip && <Tooltip tooltip={tooltip} />}
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
      <Label className="-mb-4 font-bold">Contract Directory</Label>
      <GroupContainer>
        <Field<FV>
          classes="field-admin-sec"
          label="Accounts"
          name="accountsContract"
        />
        <Field<FV>
          classes="field-admin-sec"
          label="AP Team Multisig"
          name="apTeamMultisig"
        />
        <Field<FV> classes="field-admin-sec" label="Treasury" name="treasury" />
        <Field<FV>
          classes="field-admin-sec"
          label="Index fund"
          name="indexFundContract"
        />
        <Field<FV>
          classes="field-admin-sec"
          label="Halo Token"
          name="haloToken"
        />
        <Field<FV>
          classes="field-admin-sec"
          label="Governance"
          name="govContract"
        />
        <Field<FV>
          classes="field-admin-sec"
          label="Fundraising"
          name="fundraisingContract"
        />
        <Field<FV>
          classes="field-admin-sec"
          label="Swaps Router"
          name="uniswapRouter"
        />
        <Field<FV>
          classes="field-admin-sec"
          label="Uniswap Router"
          name="uniswapRouter"
        />
        <Field<FV>
          classes="field-admin-sec"
          label="Multisig Factory"
          name="multisigFactory"
        />
        <Field<FV>
          classes="field-admin-sec"
          label="Multisig Emitter"
          name="multisigEmitter"
        />
        <Field<FV>
          classes="field-admin-sec"
          label="Charity applications"
          name="charityApplications"
        />
        <Field<FV>
          classes="field-admin-sec"
          label="Proxy admin"
          name="proxyAdmin"
        />
        <Field<FV> classes="field-admin-sec" label="USDC" name="usdcAddress" />
        <Field<FV>
          classes="field-admin-sec"
          label="WMATIC"
          name="wMaticAddress"
        />
        <Field<FV>
          classes="field-admin-sec"
          label="Gas Forwarder Factory"
          name="gasFwdFactory"
        />
      </GroupContainer>

      <Submitter type="submit" _classes="mt-4" disabled={isSubmitDisabled}>
        Submit
      </Submitter>
    </FormContainer>
  );
}
