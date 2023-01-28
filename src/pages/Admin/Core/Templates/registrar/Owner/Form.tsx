import { RegistrarOwnerValues as RV } from "pages/Admin/types";
import { FormContainer, Submitter, TextArea } from "components/admin";
import { Field } from "components/form";
import useUpdateOwner from "./useUpdateOwner";

export default function Form() {
  const { updateOwner, isSubmitDisabled } = useUpdateOwner();
  return (
    <FormContainer onSubmit={updateOwner}>
      <Field<RV>
        classes="field-admin"
        label="Proposal title"
        name="title"
        required
      />
      <TextArea<RV> label="Proposal description" name="description" required />
      <Field<RV>
        classes="field-admin"
        label="Current owner"
        name="initialOwner"
        disabled
      />
      <Field<RV>
        classes="field-admin"
        label="New owner"
        name="new_owner"
        required
      />
      <Submitter type="submit" _classes="mt-4" disabled={isSubmitDisabled}>
        Submit
      </Submitter>
    </FormContainer>
  );
}
