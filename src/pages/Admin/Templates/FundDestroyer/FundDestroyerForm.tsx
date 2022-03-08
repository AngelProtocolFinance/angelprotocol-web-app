import Label from "pages/Admin/Label";
import TextInput from "../../TextInput";
import FundSelection from "./FundSelection";
import useDestroyFund from "./useDestroyFund";

export default function FundDestroyerForm() {
  const { destroyFund } = useDestroyFund();
  return (
    <form
      onSubmit={destroyFund}
      className="w-full p-6 rounded-md grid content-start rounded-md bg-white-grey"
    >
      <TextInput title="Proposal Title" name="title" required />
      <TextInput
        title="proposal description"
        name="description"
        wide
        required
      />
      <Label text="Fund to remove" required />
      <FundSelection />

      <button
        type="submit"
        className="justify-self-center text-blue-accent hover:text-angel-blue uppercase text-white font-extrabold mt-4"
      >
        Propose changes
      </button>
    </form>
  );
}
