import { useFormContext } from "react-hook-form";
import { FormValues } from "./types";
import { Field } from "components/form";

export default function DonateField() {
  const { watch, setValue } = useFormContext<FormValues>();

  const value = watch("amount") ?? 0;

  return (
    <div className="flex flex-col gap-5 w-full items-center">
      <Field<FormValues, "number">
        type="number"
        placeholder="0"
        name="amount"
        label="Donation amount (USD)"
        classes={{ label: "font-bold", container: "w-2/3" }}
      />
      <div className="flex gap-3 justify-center items-center">
        <ButtonAdd
          value={20}
          onClick={(incr) => setValue("amount", value + incr)}
        />
        <ButtonAdd
          value={100}
          onClick={(incr) => setValue("amount", value + incr)}
        />
        <ButtonAdd
          value={250}
          onClick={(incr) => setValue("amount", value + incr)}
        />
      </div>
    </div>
  );
}

function ButtonAdd({
  value,
  onClick,
}: {
  value: number;
  onClick: (value: number) => void;
}) {
  return (
    <button
      className="border border-prim rounded-3xl px-5 py-3 flex items-center justify-center font-semibold"
      type="button"
      onClick={() => onClick(value)}
    >
      +{value}
    </button>
  );
}
