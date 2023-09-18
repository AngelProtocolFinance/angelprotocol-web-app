import { FormValues as FV } from "./types";
import { FormContainer, Submitter, Tooltip } from "components/admin";
import { Field } from "components/form";
import useSubmit from "./useSubmit";

export default function Form() {
  const { submit, isSubmitDisabled, tooltip } = useSubmit();
  return (
    <FormContainer onSubmit={submit} aria-disabled={!!tooltip}>
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
      <Field<FV> classes="field-admin" label="Token" name="token" />
      <Submitter type="submit" _classes="mt-4" disabled={isSubmitDisabled}>
        Submit
      </Submitter>
    </FormContainer>
  );
}
