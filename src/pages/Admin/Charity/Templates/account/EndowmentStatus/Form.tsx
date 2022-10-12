import { EndowmentUpdateValues as V } from "pages/Admin/types";
import { FormContainer, Label, Submitter, TextInput } from "components/admin";
import StatusOptions from "./StatusOptions";
import StatusPreview from "./StatusPreview";
import useUpdateStatus from "./useUpdateStatus";

export default function Form() {
  const { updateStatus } = useUpdateStatus();
  return (
    <FormContainer onSubmit={updateStatus}>
      <TextInput title="proposal title" name="title" required />
      <TextInput<V>
        title="proposal description"
        name="description"
        wide
        required
      />
      <TextInput<V>
        title="Endowment id"
        name="id"
        placeholder="0"
        required
        mono
        number
      />
      <StatusPreview />
      <Label _required>New endowment status</Label>
      <StatusOptions />
      <Submitter type="submit" _classes="mt-4"></Submitter>
    </FormContainer>
  );
}
