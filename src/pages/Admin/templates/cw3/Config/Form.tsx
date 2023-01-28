import { CW3ConfigValues, FormCW3Config } from "../../../types";
import Checkbox from "components/Checkbox";
import { FormContainer, Submitter, TextArea } from "components/admin";
import { TextInput } from "components/form";
import useCreateProposal from "./useCreateProposal";

type CV = CW3ConfigValues<FormCW3Config>;

export default function Form() {
  const { createProposal, isSubmitDisabled, isTime } = useCreateProposal();
  return (
    <FormContainer onSubmit={createProposal}>
      <TextInput<CV>
        classes="field-group-admin"
        label="Proposal title"
        name="title"
        required
      />
      <TextArea<CV> label="Proposal description" name="description" required />
      <TextInput<CV>
        classes="field-group-admin"
        label="Pass threshold ( % )"
        name="threshold"
        required
      />
      <TextInput<CV>
        classes="field-group-admin"
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
