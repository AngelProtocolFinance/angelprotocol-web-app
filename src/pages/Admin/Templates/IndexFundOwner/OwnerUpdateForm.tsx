import { FormContainer } from "pages/Admin/components/TemplateContainer";
import TextInput from "pages/Admin/components/TextInput";
import Submitter from "../Submitter";
import { IndexFundOwnerValues as IV } from "./updateOwnerSchema";
import useUpdateOwner from "./useUpdateOwner";

export default function OwnerUpdateForm() {
  const { updateOwner, isSubmitDisabled } = useUpdateOwner();
  return (
    <FormContainer onSubmit={updateOwner}>
      <TextInput<IV> title="Proposal Title" name="title" required />
      <TextInput<IV>
        title="proposal description"
        name="description"
        wide
        required
      />
      <TextInput<IV> title="current owner" name="initialOwner" mono disabled />
      <TextInput<IV> title="new owner" name="new_owner" mono required />
      <Submitter type="submit" _classes="mt-4" disabled={isSubmitDisabled}>
        Submit Proposal
      </Submitter>
    </FormContainer>
  );
}
