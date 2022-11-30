import { IndexFundOwnerValues as IV } from "pages/Admin/types";
import { FormContainer, Submitter, TextArea, TextPrim } from "components/admin";
import useUpdateOwner from "./useUpdateOwner";

export default function Form() {
  const { updateOwner, isSubmitDisabled } = useUpdateOwner();
  return (
    <FormContainer onSubmit={updateOwner}>
      <TextPrim<IV> label="Proposal title" name="title" required />
      <TextArea<IV> label="Proposal description" name="description" required />
      <TextPrim<IV> label="Current owner" name="initialOwner" disabled />
      <TextPrim<IV> label="New owner" name="new_owner" required />
      <Submitter type="submit" _classes="mt-4" disabled={isSubmitDisabled}>
        Submit
      </Submitter>
    </FormContainer>
  );
}
