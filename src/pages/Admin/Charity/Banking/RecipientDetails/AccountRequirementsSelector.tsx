import { AccountRequirements } from "../types";

type Props = {
  accountRequirements: AccountRequirements[];
  onChange: (index: number) => void;
};

export default function AccountRequirementsSelector({
  accountRequirements,
  onChange,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <span>Choose a transfer type:</span>
      <div className="flex gap-2">
        {accountRequirements.map((accountRequirements, index) => (
          <button
            key={accountRequirements.type}
            type="button"
            onClick={() => onChange(index)}
            className="btn-blue text-sm w-40"
          >
            {accountRequirements.title}
          </button>
        ))}
      </div>
    </div>
  );
}
