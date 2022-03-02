import TextInput from "../../TextInput";

export default function EndowmentUpdateForm() {
  return (
    <div className="w-full p-6 rounded-md grid content-start rounded-md bg-white-grey">
      <TextInput title="proposal title" name="title" />
      <TextInput title="proposal description" name="description" wide />
      <TextInput
        title="Endowment addresss"
        name="endowmentAddress"
        placeholder="terra123abc..."
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
