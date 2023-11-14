import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Icon from "components/Icon";
import { Label } from "components/form";

type Props = {
  disabled: boolean;
  onChange: (expectedFunds: number) => void;
};

export default function ExpectedFunds({ disabled, onChange }: Props) {
  return (
    <div className="field">
      <div className="flex sm:gap-2 items-center mb-1">
        <Label htmlFor="amount" required aria-required>
          What is the amount of donations (in USD) you expect to receive monthly
          on our platform?
        </Label>
        <Popover className="relative">
          <>
            <Popover.Button className="group flex items-center rounded-full text-base font-medium hover:text-orange focus:outline-none">
              <Icon type="Info" className="text-2xl" />
            </Popover.Button>
            {/** Transition is configured so that the popover appears from the top on smaller screens and from the bottom larger screens*/}
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-0 lg:translate-y-1"
              enterTo="opacity-100 translate-y-1 lg:translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-1 lg:translate-y-0"
              leaveTo="opacity-0 translate-y-0 lg:translate-y-1"
            >
              {/** using `-translate-x-2/4` instead of `-translate-x-1/2` here as the latter occasionally has no effect for some reason */}
              <Popover.Panel className="absolute -left-6 -translate-x-3/4 lg:-translate-x-2/4 lg:-translate-y-36 lg:-top-2 mt-1 sm:mt-auto z-10 w-screen max-w-xs sm:max-w-sm transform p-4 bg-white dark:bg-blue-d3 overflow-hidden text-xs sm:text-sm rounded-lg shadow-lg ring-1 ring-black/5">
                As the total amount of funds you keep on our platform increases,
                so will the size of your payouts. Depending on the payout amount
                and your bank's requirements, we may need to ask you to provide
                additional information to be able to transfer funds to your bank
                account.
              </Popover.Panel>
            </Transition>
          </>
        </Popover>
      </div>
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
