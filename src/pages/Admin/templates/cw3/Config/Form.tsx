import { CW3ConfigValues, FormCW3Config } from "../../../types";
import Checkbox from "components/Checkbox";
import { FormContainer, Submitter, TextArea } from "components/admin";
import { Field } from "components/form";
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
      <TextArea<CV> label="Proposal description" name="description" required />
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
      <Checkbox<CV>
        name="require_execution"
        classes={{
          container:
            "p-3 text-sm rounded bg-orange-l6 dark:bg-blue-d7 grid items-center border border-prim",
        }}
      >
        Execution required
      </Checkbox>

      <Submitter type="submit" disabled={isSubmitDisabled}>
        Submit
      </Submitter>
    </FormContainer>
  );
}
