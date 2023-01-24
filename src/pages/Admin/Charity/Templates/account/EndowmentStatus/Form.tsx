import { EndowmentUpdateValues as V } from "pages/Admin/types";
import { FormContainer, Submitter, TextArea, TextPrim } from "components/admin";
import { Label } from "components/form";
import StatusOptions from "./StatusOptions";
import StatusPreview from "./StatusPreview";
import useUpdateStatus from "./useUpdateStatus";

export default function Form() {
  const { updateStatus } = useUpdateStatus();
  return (
    <FormContainer onSubmit={updateStatus}>
      <TextPrim label="Proposal title" name="title" required />
      <TextArea<V> label="Proposal description" name="description" required />
      <TextPrim<V>
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
