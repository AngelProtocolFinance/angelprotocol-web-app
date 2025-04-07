import { Description, Field, Input, Label } from "@headlessui/react";
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
    <form className={`${classes} p-6 @container`}>
      <h2 className="text-lg sm:text-xl mb-4">
        How Do You Manage Online Donations Today?
      </h2>

      <div>
        <label className="label text-base font-semibold">
          Annual Online Donations
        </label>
        <p className="text-gray mb-1">
          Total amount received through online platforms
        </p>
        <input
          placeholder="$"
          className="field-input text-base"
          ref={dollarMaskRef1}
          value={state.annualAmount}
          onInput={(e) =>
            setState({ ...state, annualAmount: e.currentTarget.value })
          }
        />
      </div>

      <PctSlider
        range={[0, 0.1]}
        label="Average Processing Fees"
        classes="mt-8"
        value={+state.processingFeeRate}
        onChange={(x) => setState({ ...state, processingFeeRate: x })}
        tooltip="Processing fees are charges imposed by third-party payment processors (like banks and credit card companies) for handling online transactions."
      />
      <PctSlider
        range={[0, 0.1]}
        label="Donation Platform Fees"
        classes="mt-8"
        value={+state.platformFeeRate}
        onChange={(x) => setState({ ...state, platformFeeRate: x })}
        tooltip="Platform fees are additional charges imposed by donation platform providers, separate from payment processing fees. These may include per-transaction fees or percentage-based platform fees."
      />

      <div className="mt-6">
        <label className="label text-base font-semibold mb-2">
          Annual Platform Subscription Cost
        </label>
        <input
          placeholder="$"
          className="field-input text-base"
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

      <Field className="mt-6">
        <div className="">
          <Input
            checked={state.donorCanCoverProcessingFees}
            onChange={(e) => {
              setState({
                ...state,
                donorCanCoverProcessingFees: e.target.checked,
              });
            }}
            type="checkbox"
            className="accent-blue-d1 relative inline mr-2 top-px size-3.5"
          />
          <Label className="font-semibold ">
            Donors can cover processing fees
          </Label>
        </div>
        <Description className=" text-gray mt-1 text-sm">
          Better Giving enables donors to cover fees, and our data shows 80% opt
          to do so.
        </Description>
      </Field>

      <p className="mt-6 font-semibold ">
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
      <div className="grid gap-y-1 mt-2 @md:grid-cols-2 @lg:grid-cols-3">
        {methodsArr.map((m) => {
          return (
            <Field key={m} className="">
              <Input
                type="checkbox"
                className="accent-blue-d1 relative inline mr-2 top-px size-3.5"
                checked={state.donationTypes.includes(m)}
                onChange={(x) => {
                  if (x.target.checked) {
                    setState({
                      ...state,
                      donationTypes: [...state.donationTypes, m],
                    });
                  } else if (state.donationTypes.length === 1) {
                    // do nothing, at least 1 method must be selected
                  } else {
                    setState({
                      ...state,
                      donationTypes: state.donationTypes.filter((d) => d !== m),
                    });
                  }
                }}
              />
              <Label className="">{methods[m]}</Label>
            </Field>
          );
        })}
      </div>
    </form>
  );
}
