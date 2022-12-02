import { RegistrarOwnerValues as RV } from "pages/Admin/types";
import { FormContainer, Submitter, TextArea, TextPrim } from "components/admin";
import useUpdateOwner from "./useUpdateOwner";

export default function Form() {
  const { updateOwner, isSubmitDisabled } = useUpdateOwner();
  return (
    <FormContainer onSubmit={updateOwner}>
      <TextPrim<RV> label="Proposal title" name="title" required />
      <TextArea<RV> label="Proposal description" name="description" required />
      <TextPrim<RV> label="Current owner" name="initialOwner" disabled />
      <TextPrim<RV> label="New owner" name="new_owner" required />
      <Submitter type="submit" _classes="mt-4" disabled={isSubmitDisabled}>
        Submit
      </Submitter>
    </FormContainer>
  );
}
