import type { UserType } from "../types";

const btnClass = (isSelected: boolean) =>
  `flex items-center justify-center btn-outline-2 h-[42px] ${
    isSelected
      ? "bg-blue-l4 border-[1.25px] enabled:border-blue-d1 enabled:hover:border-blue-d1 hover:cursor-default enabled:text-blue-d1 font-bold"
      : "font-medium"
  }`;

interface Props {
  classes?: string;
  value: UserType;
  onChange: (type: UserType) => void;
  error?: string;
}
export default function UserTypeSelector({
  value,
  onChange,
  error,
  classes,
}: Props) {
  return (
    <div>
      <div className={`${classes} grid grid-cols-2 gap-3`}>
        <button
          className={btnClass(value === "donor")}
          type="button"
          onClick={() => onChange("donor")}
        >
          Donor
        </button>
        <button
          className={btnClass(value === "nonprofit")}
          type="button"
          onClick={() => onChange("nonprofit")}
        >
          Nonprofit
        </button>
      </div>
      {error && <p className="text-xs text-red mt-1">{error}</p>}
    </div>
  );
}
