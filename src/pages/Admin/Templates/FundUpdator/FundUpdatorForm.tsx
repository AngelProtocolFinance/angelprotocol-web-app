import Label from "pages/Admin/Templates/components/Label";
import TextInput from "../components/TextInput";
import FundSelection from "../components/FundSelection";
import useDestroyFund from "./useDestroyFund";
import { FundUpdateValues as FV } from "./fundUpdatorSchema";

export default function FundUpdatorForm() {
  const { updateFund } = useDestroyFund();
  return (
    <form
      onSubmit={updateFund}
      className="w-full p-6 rounded-md grid content-start rounded-md bg-white-grey"
    >
      <TextInput<FV> title="Proposal Title" name="title" required />
      <TextInput<FV>
        title="proposal description"
        name="description"
        wide
        required
      />
      <Label text="Select fund to update" required />
      <FundSelection<FV> />

      <button
        type="button"
        className="justify-self-center text-blue-accent hover:text-angel-blue uppercase text-white font-extrabold mt-4"
      >
        Propose changes
      </button>
    </form>
  );
}
