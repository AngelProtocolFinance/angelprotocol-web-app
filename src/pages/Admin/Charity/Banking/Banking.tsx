import { Popover, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { useAdminContext } from "pages/Admin/Context";
import { useProfileQuery } from "services/aws/aws";
import { useErrorContext } from "contexts/ErrorContext";
import Divider from "components/Divider";
import Icon from "components/Icon";
import LoaderRing from "components/LoaderRing";
import useDebounce from "hooks/useDebounce";
import { isEmpty } from "helpers";
import { EMAIL_SUPPORT } from "constants/env";
import { Group } from "../common";
import CurrencySelector, { Currency } from "./CurrencySelector";
import ExpectedFunds from "./ExpectedFunds";
import RecipientDetails from "./RecipientDetails";
import VerificationStatus from "./VerificationStatus";
import useCurrencies from "./useCurrencies";

const DEFAULT_TARGET_CURRENCY = "USD";

const PROFILE_ERROR = `Error loading profile. Please try again later. If the error persists,
please contact ${EMAIL_SUPPORT}.`;

export default function Banking() {
  const [expectedFunds, setExpectedFunds] = useState<number>();
  const [targetCurrency, setTargetCurrency] = useState<Currency>();
  const [wantsToResubmit, setWantsToResubmit] = useState(false);
  const [debounce, isDebouncing] = useDebounce();

  // load profile
  const { id } = useAdminContext();
  const {
    data: profile,
    isLoading: isLoadingProfile,
    isError: isProfileError,
    error,
  } = useProfileQuery({
    endowId: id,
  });

  const { handleError } = useErrorContext();

  useEffect(() => {
    if (error) {
      handleError(error, PROFILE_ERROR);
    }
  }, [error, handleError]);

  // load currencies
  const { currencies, isLoading } = useCurrencies();

  useEffect(() => {
    if (isEmpty(currencies)) {
      return;
    }
    // if DEFAULT_TARGET_CURRENCY is not among the returned currencies for whatever reason, use the first one
    const newTargetCurrency =
      currencies.find((x) => x.code === DEFAULT_TARGET_CURRENCY) ??
      currencies[0];
    setTargetCurrency(newTargetCurrency);
  }, [currencies]);

  if (isLoading || isLoadingProfile) {
    return (
      <div className="flex items-center justify-center gap-2">
        <LoaderRing thickness={10} classes="w-6" /> Loading...
      </div>
    );
  }

  if (!targetCurrency || isEmpty(currencies)) {
    return (
      <span>
        An error occurred. Please try again later. If the error persists, please
        contact {EMAIL_SUPPORT}.
      </span>
    );
  }

  if (isProfileError || !profile) {
    return <span>{PROFILE_ERROR}</span>;
  }

  const status: typeof profile.bank_verification_status =
    profile.bank_verification_status ?? "Approved";

  const disabled =
    status === "Under Review" ||
    (status === "Approved" && !wantsToResubmit) ||
    (status === "Rejected" && !wantsToResubmit);

  return (
    <div className="grid">
      <div className="grid gap-5 max-w-4xl justify-self-center">
        <Group
          title="Bank account details"
          description="The following information will be used to register your bank account that will be used to withdraw your funds."
        >
          <VerificationStatus status={status} />
          {disabled && status !== "Under Review" && (
            <UpdateDetailsButton onClick={() => setWantsToResubmit(true)} />
          )}
          <CurrencySelector
            value={targetCurrency}
            currencies={currencies}
            onChange={setTargetCurrency}
            classes="w-60 md:w-80"
            disabled={disabled}
          />
          <ExpectedFunds
            onChange={(value) => {
              // if new value is 0 (zero), no need to debounce, but
              // still call the function itself to cancel the previous call
              const delay = !value ? 0 : 1000;
              debounce(() => setExpectedFunds(value), delay);
            }}
            disabled={disabled}
          />

          {!!expectedFunds && (
            <>
              <Divider />
              <div className="min-h-[20rem]">
                {isDebouncing ? (
                  <div className="flex items-center gap-2">
                    <LoaderRing thickness={10} classes="w-6" /> Loading...
                  </div>
                ) : (
                  <RecipientDetails
                    // we need this key to tell React that when any of the fields passed to this component changes,
                    // it needs to reset its state by rerendering the whole component
                    key={`${targetCurrency.code}${expectedFunds}`}
                    targetCurrency={targetCurrency.code}
                    expectedFunds={expectedFunds}
                    disabled={disabled}
                  />
                )}
              </div>
            </>
          )}
        </Group>
      </div>
    </div>
  );
}

function UpdateDetailsButton({ onClick }: { onClick: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <div className="flex gap-2 items-center">
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
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-x-0"
            enterTo="opacity-100 translate-x-1"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-x-1"
            leaveTo="opacity-0 translate-x-0"
          >
            <Popover.Panel className="absolute left-6 -translate-y-1/2 -mt-3 z-10 w-screen max-w-sm transform p-4 bg-white dark:bg-blue-d3 overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
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
