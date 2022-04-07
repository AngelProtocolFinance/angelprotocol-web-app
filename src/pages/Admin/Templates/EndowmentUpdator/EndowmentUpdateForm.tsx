import Label from "pages/Admin/components/Label";
import TextInput from "../../components/TextInput";
import Submitter from "../Submitter";
import EndowmentPreview from "./EndowmentPreview";
import { EndowmentUpdateValues as V } from "./endowmentUpdateSchema";
import StatusOptions from "./StatusOptions";
import useUpdateStatus from "./useUpdateStatus";

export default function EndowmentUpdateForm() {
  const { updateStatus } = useUpdateStatus();
  return (
    <form
      onSubmit={updateStatus}
      className="w-full p-6 rounded-md grid content-start rounded-md bg-white-grey"
    >
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
        placeholder="terra123abc..."
        required
        mono
      />
      <EndowmentPreview />
      <Label _required>New endowment status</Label>
      <StatusOptions />
      <Submitter type="submit" _classes="mt-4">
        Submit Proposal
      </Submitter>
    </form>
  );
}
