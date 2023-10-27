import { Label } from "components/form";

type Props = {
  onChange: (expectedFunds: number) => void;
};

export default function ExpectedFunds({ onChange }: Props) {
  return (
    <div className="field">
      <Label htmlFor="amount">
        What is the amount of donations you expect to receive on our platform?
      </Label>
      <input
        id="amount"
        type="number"
        onChange={(event) => onChange(Number(event.target.value))}
        className="field-input text-field"
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  );
}
