import { useFormContext } from "react-hook-form";
import { FormValues } from "./types";
import { Field } from "components/form";

export default function DonateField() {
  const { watch, setValue } = useFormContext<FormValues>();

  const value = watch("amount") || 0;

  const add = (incr: number): void =>
    setValue("amount", value + incr, { shouldValidate: true });

  return (
    <div className="flex flex-col gap-5 w-full items-center">
      <Field<FormValues, "number">
        type="number"
        placeholder="100"
        name="amount"
        label="Donation amount (USD)"
        classes={{ label: "font-bold", container: "w-2/3" }}
      />
      <div className="flex gap-3 justify-center items-center">
        <ButtonAdd value={20} onClick={add} />
        <ButtonAdd value={100} onClick={add} />
        <ButtonAdd value={250} onClick={add} />
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
