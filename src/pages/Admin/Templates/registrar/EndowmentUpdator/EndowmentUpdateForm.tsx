import { EndowmentUpdateValues as V } from "pages/Admin/types";
import { FormContainer, Label, Submitter, TextInput } from "components/admin";
import EndowmentPreview from "./EndowmentPreview";
import StatusOptions from "./StatusOptions";
import useUpdateStatus from "./useUpdateStatus";

export default function EndowmentUpdateForm() {
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
      <EndowmentPreview />
      <Label _required>New endowment status</Label>
      <StatusOptions />
      <Submitter type="submit" _classes="mt-4">
        Submit Proposal
      </Submitter>
    </FormContainer>
  );
}
