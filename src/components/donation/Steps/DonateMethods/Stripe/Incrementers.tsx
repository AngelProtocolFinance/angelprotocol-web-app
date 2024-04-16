import { useFormContext } from "react-hook-form";
import { FormValues } from "./types";

export default function Incrementers() {
  return (
    <div className="flex justify-center gap-3">
      <Incrementer value={40} />
      <Incrementer value={100} />
      <Incrementer value={200} />
    </div>
  );
}

function Incrementer({ value }: { value: number }) {
  const { setValue, trigger, watch } = useFormContext<FormValues>();
  return (
    <button
      className="text-sm font-medium border border-gray-l4 hover:border-gray-l3 rounded-full w-20 h-10"
      onClick={() => {
        const amount = Number(watch("amount"));
        if (Number.isNaN(amount)) {
          trigger("amount");
        } else {
          setValue("amount", `${amount + value}`);
        }
      }}
    >
      +${value}
    </button>
  );
}
