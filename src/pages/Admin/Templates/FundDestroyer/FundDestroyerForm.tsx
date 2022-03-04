import TextInput from "../../TextInput";
import useCreateFund from "./useDestroyFund";

export default function FundDestroyerForm() {
  const { createFund } = useCreateFund();
  return (
    <div className="w-full p-6 rounded-md grid content-start rounded-md bg-white-grey">
      <TextInput title="Proposal Title" name="title" required />
      <TextInput
        title="proposal description"
        name="description"
        wide
        required
      />

      <button
        type="button"
        onClick={createFund}
        className="justify-self-center text-blue-accent hover:text-angel-blue uppercase text-white font-extrabold mt-4"
      >
        Propose changes
      </button>
    </div>
  );
}
