import { useMaskito } from "@maskito/react";
import { Arrow, Content, Tooltip } from "components/tooltip";
import { CircleHelpIcon } from "lucide-react";
import { dollarMaskOpts } from "./dollar-mask";
import { PctSlider } from "./pct-slider";
import { type State, methods, methodsArr } from "./types";

interface Props {
  classes?: string;
  state: State;
  setState: (x: State) => void;
}

export function Form1({ classes = "", state, setState }: Props) {
  const dollarMaskRef1 = useMaskito({ options: dollarMaskOpts });
  const dollarMaskRef2 = useMaskito({ options: dollarMaskOpts });
  return (
    <form className={`${classes} bg-white shadow-sm p-6 rounded-lg`}>
      <h2 className="text-xl mb-2">
        How Do You Manage Online Donations Today?
      </h2>

      <div>
        <label className="label font-semibold">Annual Online Donations</label>
        <p className="text-sm text-gray mb-1">
          Total amount received through online platforms
        </p>
        <input
          placeholder="$"
          className="field-input"
          ref={dollarMaskRef1}
          value={state.annualAmount}
          onInput={(e) =>
            setState({ ...state, annualAmount: e.currentTarget.value })
          }
        />
      </div>

      <PctSlider
        label="Average Processing Fees"
        classes="mt-8"
        value={+state.averageProcessingFee}
        onChange={(x) => setState({ ...state, averageProcessingFee: x })}
        tooltip="Processing fees are charges imposed by third-party payment processors (like banks and credit card companies) for handling online transactions."
      />
      <PctSlider
        label="Donation Platform Fees"
        classes="mt-8"
        value={+state.platformFees}
        onChange={(x) => setState({ ...state, platformFees: x })}
        tooltip="Platform fees are additional charges imposed by donation platform providers, separate from payment processing fees. These may include per-transaction fees or percentage-based platform fees."
      />

      <div className="mt-6">
        <label className="label font-semibold mb-2">
          Annual Platform Subscription Cost
        </label>
        <input
          placeholder="$"
          className="field-input"
          ref={dollarMaskRef2}
          value={state.annualSubscriptionCost}
          onInput={(e) =>
            setState({
              ...state,
              annualSubscriptionCost: e.currentTarget.value,
            })
          }
        />
      </div>

      <div className="mt-4">
        <div className="">
          <input
            checked={state.donorCanCoverProcessingFees}
            onChange={(e) => {
              setState({
                ...state,
                donorCanCoverProcessingFees: e.target.checked,
              });
            }}
            type="checkbox"
            className="accent-blue-d1 relative inline mr-2 top-px size-3"
          />
          <span className="font-semibold text-sm">
            Donors can cover processing fees
          </span>
        </div>
        <p className="text-sm text-gray mt-1">
          Better Giving enables donors to cover fees, and our data shows 80% opt
          to do so.
        </p>
      </div>

      <p className="mt-6 font-semibold text-sm">
        Donation types currently accepted
        <Tooltip
          tip={
            <Content className="max-w-xs text-center bg-gray-d4 p-4 text-gray-l4 text-xs shadow-lg rounded-lg">
              Based on industry data, each payment type represents a portion of
              potential donations: Credit Card (63%), Bank/ACH (10%), Digital
              Wallets (7%), DAF (12%), Stocks (6%), Crypto (2%). Better Giving
              enables all these payment methods.
              <Arrow />
            </Content>
          }
        >
          <CircleHelpIcon
            size={14}
            className="relative inline bottom-px ml-1"
          />
        </Tooltip>
      </p>
      <div className="grid gap-y-1 mt-2">
         
        {methodsArr.map((m) => {
          return (
            <div key={m} className="">
              <input
                id={m}
                type="checkbox"
                className="accent-blue-d1 relative inline mr-2 top-px size-3"
                checked={state.donationTypes.includes(m)}
                onChange={(x) => {
                  if (x.target.checked) {
                    setState({
                      ...state,
                      donationTypes: [...state.donationTypes, m],
                    });
                  } else {
                    setState({
                      ...state,
                      donationTypes: state.donationTypes.filter((d) => d !== m),
                    });
                  }
                }}
              />
              <label htmlFor={m} className="text-sm">
                {methods[m]}
              </label>
            </div>
          );
        })}
      </div>
    </form>
  );
}
