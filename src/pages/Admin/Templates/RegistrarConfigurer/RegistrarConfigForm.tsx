import TextInput from "pages/Admin/components/TextInput";
import Submitter from "../Submitter";
import { RegistrarConfigValues as RV } from "./registrarConfigSchema";

export default function RegistrarConfigForm() {
  return (
    <form
      onSubmit={() => {}}
      className="w-full p-6 rounded-md grid content-start rounded-md bg-white-grey"
    >
      <TextInput<RV> title="Proposal Title" name="title" required />
      <TextInput<RV>
        title="proposal description"
        name="description"
        wide
        required
      />
      <Submitter type="submit" _classes="mt-4">
        Submit Proposal
      </Submitter>
    </form>
  );
}
