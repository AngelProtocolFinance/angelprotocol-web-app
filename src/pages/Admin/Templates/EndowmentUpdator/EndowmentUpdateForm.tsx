import TextInput from "../../TextInput";

export default function EndowmentUpdateForm() {
  return (
    <div className="w-full p-6 rounded-md grid content-start rounded-md bg-white-grey">
      <TextInput title="proposal title" name="title" required />
      <TextInput
        title="proposal description"
        name="description"
        wide
        required
      />
      <TextInput
        title="Endowment addresss"
        name="endowmentAddress"
        placeholder="terra123abc..."
        required
      />
      <button
        type="button"
        onClick={() => {}}
        className="justify-self-center text-blue-accent hover:text-angel-blue uppercase text-white font-extrabold mt-4"
      >
        Propose changes
      </button>
    </div>
  );
}
