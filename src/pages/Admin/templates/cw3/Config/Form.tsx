import { CW3ConfigValues, FormCW3Config } from "../../../types";
import { FormContainer, Submitter } from "components/admin";
import { CheckField, Field } from "components/form";
import useCreateProposal from "./useCreateProposal";

type CV = CW3ConfigValues<FormCW3Config>;

export default function Form() {
  const { createProposal, isSubmitDisabled, isTime } = useCreateProposal();
  return (
    <FormContainer onSubmit={createProposal}>
      <Field<CV>
        classes="field-admin"
        label="Proposal title"
        name="title"
        required
      />
      <Field<CV, "textarea">
        type="textarea"
        classes="field-admin"
        label="Proposal description"
        name="description"
        required
      />
      <Field<CV>
        classes="field-admin"
        label="Pass threshold ( % )"
        name="threshold"
        required
      />
      <Field<CV>
        classes="field-admin"
        label={`Voting period (${isTime ? "seconds" : "blocks"})`}
        name="duration"
        required
      />
      <CheckField<CV>
        name="require_execution"
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
