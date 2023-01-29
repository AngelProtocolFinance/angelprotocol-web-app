import { CW3ConfigValues, FormReviewCW3Config } from "pages/Admin/types";
import Checkbox from "components/Checkbox";
import { FormContainer, Submitter } from "components/admin";
import { Field } from "components/form";
import useCreateProposal from "./useCreateProposal";

type CV = CW3ConfigValues<FormReviewCW3Config>;

export default function Form() {
  const { createProposal, isSubmitDisabled, isTime } = useCreateProposal();
  return (
    <FormContainer onSubmit={createProposal}>
      <Field<CV>
        classes="field-admin"
        label="Proposal Title"
        name="title"
        required
      />
      <Field<CV, "textarea">
        type="textarea"
        classes="field-admin"
        label="proposal description"
        name="description"
        required
      />
      <Field<CV>
        classes="field-admin"
        label="pass threshold ( % )"
        name="threshold"
        required
      />
      <Field<CV>
        classes="field-admin"
        label={`voting period (${isTime ? "seconds" : "blocks"})`}
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
      <Submitter type="submit" _classes="mt-4" disabled={isSubmitDisabled}>
        Submit
      </Submitter>
    </FormContainer>
  );
}
