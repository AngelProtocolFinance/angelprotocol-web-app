import { RequirementsData } from "./types";
import { Label } from "components/form";

type Props = {
  requirementsDataArray: RequirementsData[];
  className: string;
  selectedType: string;
  disabled: boolean;
  onChange: (requirementsType: RequirementsData) => void;
};

export default function AccountRequirementsSelector({
  className = "",
  disabled,
  onChange,
  requirementsDataArray,
  selectedType,
}: Props) {
  return (
    <div className={`grid gap-2 ${className}`}>
      <Label>Choose a transfer type:</Label>
      <div className="flex flex-wrap gap-2">
        {requirementsDataArray.map((x) => (
          <button
            key={x.accountRequirements.type}
            type="button"
            onClick={() => onChange(x)}
            className={`${
              x.accountRequirements.type === selectedType
                ? "btn-blue"
                : "btn-outline"
            } text-xs sm:text-sm w-32 sm:w-48`}
            disabled={disabled}
            aria-disabled={disabled}
          >
            {x.accountRequirements.title}
          </button>
        ))}
      </div>
    </div>
  );
}
