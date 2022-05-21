import { FormContainer } from "pages/Admin/components/TemplateContainer";
import TextInput from "pages/Admin/components/TextInput";
import { RegistrarOwnerValues as RV } from "pages/Admin/types";
import Submitter from "../Submitter";
import useUpdateOwner from "./useUpdateOwner";

export default function OwnerUpdateForm() {
  const { updateOwner, isSubmitDisabled } = useUpdateOwner();
  return (
    <FormContainer onSubmit={updateOwner}>
      <TextInput<RV> title="Proposal Title" name="title" required />
      <TextInput<RV>
        title="proposal description"
        name="description"
        wide
        required
      />
      <TextInput<RV> title="current owner" name="initialOwner" mono disabled />
      <TextInput<RV> title="new owner" name="new_owner" mono required />
      <Submitter type="submit" _classes="mt-4" disabled={isSubmitDisabled}>
        Submit Proposal
      </Submitter>
    </FormContainer>
  );
}
