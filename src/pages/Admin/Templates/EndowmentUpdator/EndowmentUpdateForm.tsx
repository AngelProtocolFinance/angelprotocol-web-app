import Label from "pages/Admin/Templates/components/Label";
import TextInput from "../components/TextInput";
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
      <Label text="New endowment Status" required />
      <StatusOptions />
      <button
        type="submit"
        className="justify-self-center text-blue-accent hover:text-angel-blue uppercase text-white font-extrabold mt-4"
      >
        Propose changes
      </button>
    </form>
  );
}
