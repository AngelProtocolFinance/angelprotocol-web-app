import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Icon from "components/Icon";
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
      <div className="flex sm:gap-2 items-center mb-1">
        <Label htmlFor="wise__amount">
          What is the amount of donations (in USD) you expect to receive monthly
          on our platform?
        </Label>
        <Popover className="relative">
          <>
            <Popover.Button className="group flex items-center rounded-full text-base font-medium hover:text-orange focus:outline-none">
              <Icon type="Info" className="text-2xl" />
            </Popover.Button>
            {/** Transition is configured so that the popover appears from the top on smaller screens and from the bottom on larger screens*/}
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
              <Popover.Panel className="absolute -left-6 -translate-x-3/4 lg:-translate-x-2/4 lg:-top-40 mt-1 sm:mt-0 z-10 w-screen max-w-xs sm:max-w-sm p-4 bg-white dark:bg-blue-d3 overflow-hidden text-xs sm:text-sm rounded-lg shadow-lg ring-1 ring-black/5">
                Depending on how much you expect to receive each month via{" "}
                {APP_NAME}, different details are required. At this point, we
                recommend using a conservative figure - Maybe $1000 per month.
              </Popover.Panel>
            </Transition>
          </>
        </Popover>
      </div>
      <input
        id="wise__amount"
        type="text"
        value={props.value}
        pattern="^[1-9]\d*$"
        required
        placeholder="1,000"
        onChange={(event) => props.onChange(event.target.value)}
        className={`field-input text-field ${props.classes.input} invalid:ring-1 invalid:ring-red`}
        autoComplete="off"
        spellCheck={false}
        disabled={props.disabled}
        inputMode="numeric"
      />
    </div>
  );
}
