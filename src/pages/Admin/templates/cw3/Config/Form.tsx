import { CW3ConfigValues, FormCW3Config } from "../../../types";
import CheckboxFormField from "components/CheckboxFormField";
import { FormContainer, Submitter, TextArea, TextPrim } from "components/admin";
import useCreateProposal from "./useCreateProposal";

type CV = CW3ConfigValues<FormCW3Config>;

export default function Form() {
  const { createProposal, isSubmitDisabled, isTime } = useCreateProposal();
  return (
    <FormContainer onSubmit={createProposal}>
      <TextPrim<CV> label="Proposal title" name="title" required />
      <TextArea<CV> label="Proposal description" name="description" required />
      <TextPrim<CV> label="Pass threshold ( % )" name="threshold" required />
      <TextPrim<CV>
        label={`Voting period (${isTime ? "seconds" : "blocks"})`}
        name="duration"
        required
      />
      <CheckboxFormField<CV>
        name="require_execution"
        classes={{
          container:
            "p-3 text-sm rounded bg-orange-l6 dark:bg-blue-d7 grid items-center border border-prim",
        }}
      >
        Execution required
      </CheckboxFormField>

      <Submitter type="submit" disabled={isSubmitDisabled}>
        Submit
      </Submitter>
    </FormContainer>
  );
}
