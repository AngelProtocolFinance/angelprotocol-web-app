import Label from "pages/Admin/Label";
import { useFormContext } from "react-hook-form";
import TextInput from "../../TextInput";
import { EndowmentUpdateValues } from "./endowmentUpdateSchema";

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
      <Label text="New endowment Status" />
      <div className="border-2 rounded-md grid grid-cols-4 divide-x">
        <StatusOption label="Inactive" value="0" />
        <StatusOption label="Active" value="1" />
        <StatusOption label="Frozen" value="2" />
        <StatusOption label="Closed" value="3" />
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

function StatusOption(props: {
  label: string;
  value: EndowmentUpdateValues["status"];
}) {
  const { register, watch } = useFormContext<EndowmentUpdateValues>();
  const status = watch("status");
  const isSelected = status === props.value;

  return (
    <div className="relative flex justify-center">
      <label
        htmlFor={`__${props.value}`}
        className={`p-3 rounded-sm w-full text-center 
        uppercase text-angel-grey font-semibold cursor-pointer 
        hover:bg-angel-blue  hover:bg-opacity-10 ${
          isSelected
            ? "bg-angel-blue bg-opacity-10 shadow-inner-white-grey pointer-events-none"
            : ""
        }`}
      >
        {props.label}
      </label>
      <input
        {...register("status")}
        id={`__${props.value}`}
        value={props.value}
        type="radio"
        className="w-0 h-0 appearance-none absolute"
      />
    </div>
  );
}
