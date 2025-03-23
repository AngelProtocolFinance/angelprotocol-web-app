import { PctSlider } from "./pct-slider";
import type { State } from "./types";

interface Props {
  classes?: string;
  state: State;
  setState: (x: State) => void;
}

export function Form2({ classes = "", state, setState }: Props) {
  return (
    <div className={`${classes} bg-white shadow-sm p-6 rounded-lg mt-4`}>
      <h2 className="text-xl mb-2">Projected Savings & Investment</h2>

      <PctSlider
        label="Percentage to allocate towards savings/investments"
        value={+state.donationsToSavings}
        onChange={(x) => setState({ ...state, donationsToSavings: x })}
        tooltip="Select the percentage of donations you would consider allocating towards savings and investments if it were handled effortlessly on your behalf."
      />
      <p className="text-sm text-gray mt-1">
        Better Giving automates this process completely, handling allocations
        and investment management.
      </p>

      <p className="font-semibold mt-6 text-blue-d1">
        Allocation between accounts
      </p>
      <PctSlider
        label="Savings Account (4% yield)"
        classes="mt-2"
        value={1 - +state.savingsInvested}
        onChange={(x) => setState({ ...state, savingsInvested: 1 - x })}
        tooltip="Projected yield based on average annual returns over the past 5 years."
      />
      <PctSlider
        label="Sustainability Fund (20% avg. return)"
        classes="mt-2"
        value={+state.savingsInvested}
        onChange={(x) => setState({ ...state, savingsInvested: x })}
        tooltip="Projected yield based on average annual returns over the past 5 years."
      />
    </div>
  );
}
