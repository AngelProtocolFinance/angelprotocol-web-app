import Label from "pages/Admin/components/Label";
import TextInput from "../../components/TextInput";
import FundSelection from "../FundSelection";
import Submitter from "../Submitter";
import { FundDestroyValues as FD } from "./fundDestroyerSchema";
import useDestroyFund from "./useDestroyFund";

export default function FundDestroyerForm() {
  const { destroyFund, isSubmitDisabled } = useDestroyFund();
  return (
    <form
      onSubmit={destroyFund}
      className="w-full p-6 rounded-md grid content-start rounded-md bg-white-grey"
    >
      <TextInput<FD> title="Proposal Title" name="title" required />
      <TextInput<FD>
        title="proposal description"
        name="description"
        wide
        required
      />
      <Label _required>Fund to remove</Label>
      <FundSelection<FD> fieldName="fundId" />
      <Submitter type="submit" _classes="mt-4" disabled={isSubmitDisabled}>
        Propose changes
      </Submitter>
    </form>
  );
}
