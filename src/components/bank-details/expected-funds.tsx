import { Label } from "components/form";
import { APP_NAME } from "constants/env";

type Props = {
  classes: { input: string };
  onChange: (amount: string) => void;
  value: string;
  disabled?: boolean;
};

export default function ExpectedFunds(props: Props) {
  return (
    <div className="field">
      <Label htmlFor="wise__amount" required>
        What is the amount of donations (in USD) you expect to receive monthly
        on our platform?
      </Label>
      <input
        id="wise__amount"
        type="number"
        value={props.value}
        required
        placeholder="1,000"
        onChange={(event) => props.onChange(event.target.value)}
        className={`field-input ${props.classes.input} invalid:ring-1 invalid:ring-red`}
        autoComplete="off"
        spellCheck={false}
        disabled={props.disabled}
      />
      <p className="text-gray text-sm my-2 italic">
        Depending on how much you expect to receive each month via {APP_NAME},
        different details are required. At this point, we recommend using a
        conservative figure - Maybe $1000 per month.
      </p>
    </div>
  );
}
