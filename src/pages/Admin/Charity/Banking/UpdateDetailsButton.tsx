import { Popover, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import Icon from "components/Icon";

type Props = {
  className?: string;
  onClick: () => void;
};

export default function UpdateDetailsButton(props: Props) {
  const { className = "", onClick } = props;

  const ref = useRef<HTMLButtonElement>(null);

  return (
    <div className={`flex gap-2 items-center ${className}`}>
      <button
        ref={ref}
        type="button"
        className="px-2 btn-orange text-xs w-40"
        onClick={onClick}
      >
        Update Bank Details
      </button>
      <Popover className="relative">
        <>
          <Popover.Button className="group flex items-center rounded-full text-base font-medium hover:text-orange focus:outline-none">
            <Icon type="Info" className="text-2xl" />
          </Popover.Button>
          {/** Transition is configured so that the popover appears from the top on smaller screens and from the left larger screens*/}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 lg:translate-y-auto translate-y-0 lg:translate-x-auto lg:translate-x-0"
            enterTo="opacity-100 lg:translate-y-auto translate-y-1 lg:translate-x-auto lg:translate-x-1"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 lg:translate-y-auto translate-y-1 lg:translate-x-auto lg:translate-x-1"
            leaveTo="opacity-0 lg:translate-y-auto translate-y-0 lg:translate-x-auto lg:translate-x-0"
          >
            {/** using `-translate-x-2/4` instead of `-translate-x-1/2` here as the latter has no effect for some reason */}
            <Popover.Panel className="absolute -left-6 lg:left-8 -translate-x-2/4 sm:-translate-x-1/4 lg:translate-x-0 lg:-translate-y-1/2 mt-1 z-10 w-screen max-w-xs sm:max-w-sm transform p-4 bg-white dark:bg-blue-d3 overflow-hidden text-xs sm:text-sm rounded-lg shadow-lg ring-1 ring-black/5">
              Submitting new bank details will void your existing bank
              connection and will require a review and approval. Do so with care
              to prevent unnecessary payout delays!
            </Popover.Panel>
          </Transition>
        </>
      </Popover>
    </div>
  );
}
