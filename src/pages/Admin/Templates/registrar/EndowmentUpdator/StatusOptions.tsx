import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { EndowmentUpdateValues as V } from "pages/Admin/types";
import { TextInput } from "components/admin";

export default function StatusOptions() {
  const {
    watch,
    formState: { errors },
  } = useFormContext<V>();
  const status = watch("status");
  const isClosed = status === "3";

  return (
    <>
      <div className="border-2 rounded-md grid grid-cols-4 divide-x">
        <StatusOption label="Inactive" value="0" />
        <StatusOption label="Active" value="1" />
        <StatusOption label="Frozen" value="2" />
        <StatusOption label="Closed" value="3" />
      </div>
      <ErrorMessage
        as="p"
        errors={errors}
        name="status"
        className="font-mono font-semibold text-right text-red-400 text-xs m-1"
      />
      {isClosed && <div className="h-6"></div>}
      {isClosed && (
        <TextInput<V>
          title="Beneficiary"
          name="beneficiary"
          placeholder="juno123abc..."
          required
          mono
        />
      )}
    </>
  );
}

function StatusOption(props: { label: string; value: V["status"] }) {
  const { register, watch } = useFormContext<V>();
  const status = watch("status");
  const isSelected = status === props.value;

  return (
    <div className="relative flex justify-center">
      <label
        htmlFor={`__${props.value}`}
        className={`p-3 rounded-sm w-full text-center 
        uppercase text-angel-grey font-semibold cursor-pointer 
        hover:bg-angel-blue  hover:bg-angel-blue/10 ${
          isSelected
            ? "bg-angel-blue/10 shadow-inner-white-grey pointer-events-none"
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
