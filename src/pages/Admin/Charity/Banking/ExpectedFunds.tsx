import { Label } from "components/form";

type Props = {
  disabled: boolean;
  onChange: (expectedFunds: number) => void;
};

export default function ExpectedFunds({ disabled, onChange }: Props) {
  return (
    <div className="field">
      <Label htmlFor="amount" required aria-required>
        What is the amount of donations you expect to receive on our platform?
      </Label>
      <div className="w-60 md:w-80">
        <input
          id="amount"
          type="number"
          placeholder="10.000"
          onChange={(event) => onChange(Number(event.target.value))}
          className="field-input text-field"
          autoComplete="off"
          spellCheck={false}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
