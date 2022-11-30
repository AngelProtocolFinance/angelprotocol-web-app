import { RegistrarOwnerValues as RV } from "pages/Admin/types";
import { FormContainer, Submitter, TextInput } from "components/admin";
import useUpdateOwner from "./useUpdateOwner";

export default function Form() {
  const { updateOwner, isSubmitDisabled } = useUpdateOwner();
  return (
    <FormContainer onSubmit={updateOwner}>
      <TextInput<RV> title="Proposal title" name="title" required />
      <TextInput<RV>
        title="proposal description"
        name="description"
        wide
        required
      />
      <TextInput<RV> title="current owner" name="initialOwner" mono disabled />
      <TextInput<RV> title="new owner" name="new_owner" mono required />
      <Submitter type="submit" _classes="mt-4" disabled={isSubmitDisabled}>
        Submit
      </Submitter>
    </FormContainer>
  );
}
