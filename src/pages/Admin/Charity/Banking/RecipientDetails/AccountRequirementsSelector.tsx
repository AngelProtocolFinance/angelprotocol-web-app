import { AccountRequirements } from "types/aws";
import { Label } from "components/form";

type Props = {
  accountRequirements: AccountRequirements[];
  className?: string;
  currentIndex: number | undefined;
  disabled: boolean;
  onChange: (index: number) => void;
};

export default function AccountRequirementsSelector({
  accountRequirements,
  className = "",
  currentIndex,
  disabled,
  onChange,
}: Props) {
  return (
    <div className={`grid gap-2 ${className}`}>
      <Label>Choose a transfer type:</Label>
      <div className="flex flex-wrap gap-2">
        {accountRequirements.map((accountRequirements, index) => (
          <button
            key={accountRequirements.type}
            type="button"
            onClick={() => onChange(index)}
            className={`${
              index === currentIndex ? "btn-blue" : "btn-outline"
            } text-xs sm:text-sm w-40 sm:w-48`}
            disabled={disabled}
            aria-disabled={disabled}
          >
            {accountRequirements.title}
          </button>
        ))}
      </div>
    </div>
  );
}
