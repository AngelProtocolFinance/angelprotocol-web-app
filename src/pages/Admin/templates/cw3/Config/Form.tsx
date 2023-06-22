import { FormValues as FV } from "./types";
import { FormContainer, Submitter, Tooltip } from "components/admin";
import { CheckField, Field } from "components/form";
import useCreateProposal from "./useCreateProposal";

export default function Form() {
  const { createProposal, isSubmitDisabled, tooltip } = useCreateProposal();
  return (
    <FormContainer onSubmit={createProposal} aria-disabled={!!tooltip}>
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
      <Field<FV>
        classes="field-admin"
        label="Number of signatures to pass tx"
        name="threshold"
        required
      />

      <CheckField<FV>
        name="requireExecution"
        classes="p-3 text-sm rounded bg-orange-l6 dark:bg-blue-d7 border border-prim"
      >
        Execution required
      </CheckField>

      <Submitter type="submit" disabled={isSubmitDisabled}>
        Submit
      </Submitter>
    </FormContainer>
  );
}
