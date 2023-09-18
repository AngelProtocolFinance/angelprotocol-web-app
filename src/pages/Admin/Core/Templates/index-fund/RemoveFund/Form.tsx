import { FormValues as FV } from "./types";
import { FormContainer, Submitter, Tooltip } from "components/admin";
import { Field } from "components/form";
import useDestroyFund from "./useDestroyFund";

export default function Form() {
  const { destroyFund, isSubmitDisabled, tooltip } = useDestroyFund();
  return (
    <FormContainer onSubmit={destroyFund} aria-disabled={!!tooltip}>
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
      <Field<FV> classes="field-admin" label="Fund ID" name="fundId" required />
      <Submitter type="submit" _classes="mt-4" disabled={isSubmitDisabled}>
        Submit
      </Submitter>
    </FormContainer>
  );
}
