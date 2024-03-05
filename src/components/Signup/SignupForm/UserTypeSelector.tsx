import { useController, useFormContext } from "react-hook-form";
import { FormValues } from "../types";

const btnClass = (isSelected: boolean) =>
  `flex items-center justify-center btn-outline-2 h-[42px] ${
    isSelected
      ? "bg-[#EAF3FA] border-[1.25px] enabled:border-blue-d1 enabled:hover:border-blue-d1 hover:cursor-default enabled:text-blue-d1 font-bold"
      : "font-medium"
  }`;

export default function UserTypeSelector() {
  const { control } = useFormContext<FormValues>();

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController<FormValues, "userType">({
    control: control,
    name: "userType",
  });

  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        <button
          className={btnClass(value === "donor")}
          type="button"
          onClick={() => onChange("donor")}
        >
          Donor
        </button>
        <button
          className={btnClass(value === "non-profit")}
          type="button"
          onClick={() => onChange("non-profit")}
        >
          Non-profit
        </button>
      </div>
      {error && <p className="text-xs text-[#C52828] mt-1">{error.message}</p>}
    </div>
  );
}
