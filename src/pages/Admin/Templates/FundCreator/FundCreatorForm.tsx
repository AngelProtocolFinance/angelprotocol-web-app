import TextInput from "../../TextInput";
import Label from "../../Label";

export default function FundCreatorForm() {
  return (
    <div className="w-full p-6 rounded-md grid content-start rounded-md bg-white-grey">
      <TextInput title="Proposal Title" name="title" placeholder="title" />
      <TextInput
        title="proposal description"
        name="description"
        placeholder="tell something about your proposal"
        wide
      />

      <Label text="fund details" textColor="text-angel-orange" />
      <div className="shadow-inner-white-grey bg-light-grey rounded-md p-3  mb-6">
        <TextInput
          title="name"
          name="name"
          placeholder="A wonderful fund name"
          plain
        />
        <TextInput
          title="description"
          name="name"
          placeholder="A little something about the fund.."
          wide
          plain
        />
        <TextInput
          title="expiry height"
          name="name"
          placeholder="700992312"
          plain
          mono
        />
        <DateInput />
        <p>split to liquid</p>

        <CheckInput />
      </div>

      <Label text="add members" textColor="text-green-400" />
      <p>show members here with x</p>
      <div className="shadow-inner-white-grey bg-light-grey rounded-md p-3 grid">
        <TextInput
          title="endowment address"
          name="name"
          placeholder="terra123abc..."
          plain
          mono
        />
        <button className="justify-self-end text-green-400 font-bold text-sm">
          + add member
        </button>
      </div>

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

function CheckInput() {
  return (
    <div className="text-angel-grey flex items-center">
      <input type="checkbox" />
      <label className="pb-1 ml-2">this fund rotates</label>
    </div>
  );
}

function DateInput() {
  return (
    <div className="text-angel-grey grid">
      <label className="mb-2 text-xs font-heading uppercase font-bold text-angel-grey">
        Expirty time
      </label>
      <input
        type="datetime-local"
        className="bg-light-grey border-b-2 border-opacity-30 border-angel-grey rounded-none pb-1"
      />
    </div>
  );
}
