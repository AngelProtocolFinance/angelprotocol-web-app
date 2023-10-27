import { AccountRequirements } from "types/aws";
import { Label } from "components/form";

type Props = {
  accountRequirements: AccountRequirements[];
  className?: string;
  currentIndex: number | undefined;
  onChange: (index: number) => void;
};

export default function AccountRequirementsSelector({
  accountRequirements,
  className = "",
  currentIndex,
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
            } text-sm w-48`}
          >
            {accountRequirements.title}
          </button>
        ))}
      </div>
    </div>
  );
}
