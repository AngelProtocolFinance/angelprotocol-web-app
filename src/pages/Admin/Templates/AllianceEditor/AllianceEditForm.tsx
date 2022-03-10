import TextInput from "../../components/TextInput";
import Submitter from "../Submitter";
import { AllianceEditValues as AV } from "./alllianceEditSchema";

export default function AllianceEditForm() {
  return (
    <form
      onSubmit={() => {}}
      className="w-full p-6 rounded-md grid content-start rounded-md bg-white-grey"
    >
      <TextInput title="proposal title" name="title" required />
      <TextInput<AV>
        title="proposal description"
        name="description"
        wide
        required
      />
      <TextInput<AV>
        title="wallet address"
        name="walletAddr"
        placeholder="terra123abc..."
        required
        mono
      />
      <Submitter _text="Propose Changes" type="submit" _classes="mt-4" />
    </form>
  );
}
