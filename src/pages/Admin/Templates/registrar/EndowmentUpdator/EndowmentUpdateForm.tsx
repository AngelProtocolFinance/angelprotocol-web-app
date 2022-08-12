import { EndowmentUpdateValues as V } from "pages/Admin/types";
import Label from "pages/Admin/common/Label";
import { FormContainer } from "pages/Admin/common/TemplateContainer";
import Submitter from "../../../common/Submitter";
import TextInput from "../../../common/TextInput";
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
        title="Endowment addresss"
        name="endowmentAddr"
        placeholder="juno123abc..."
        required
        mono
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
