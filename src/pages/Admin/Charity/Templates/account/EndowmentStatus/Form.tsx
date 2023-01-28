import { EndowmentUpdateValues as V } from "pages/Admin/types";
import { FormContainer, Submitter, TextArea } from "components/admin";
import { Label, TextInput } from "components/form";
import StatusOptions from "./StatusOptions";
import StatusPreview from "./StatusPreview";
import useUpdateStatus from "./useUpdateStatus";

export default function Form() {
  const { updateStatus } = useUpdateStatus();
  return (
    <FormContainer onSubmit={updateStatus}>
      <TextInput<V>
        classes="field-group-admin"
        label="Proposal title"
        name="title"
        required
      />
      <TextArea<V> label="Proposal description" name="description" required />
      <TextInput<V>
        classes="field-group-admin"
        label="Endowment id"
        name="id"
        placeholder="0"
        required
        type="number"
      />
      <StatusPreview />
      <Label required className="-mb-4">
        New endowment status
      </Label>
      <StatusOptions />
      <Submitter type="submit" _classes="mt-4">
        Submit
      </Submitter>
    </FormContainer>
  );
}
