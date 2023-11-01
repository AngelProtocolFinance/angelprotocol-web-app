import { useEffect, useState } from "react";
import { useAdminContext } from "pages/Admin/Context";
import { useProfileQuery } from "services/aws/aws";
import { useErrorContext } from "contexts/ErrorContext";
import Divider from "components/Divider";
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
      <div className="flex items-center gap-2">
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

  return (
    <div className="grid">
      <div className="grid gap-5 max-w-4xl justify-self-center">
        <Group
          title="Bank account details"
          description="The following information will be used to register your bank account that will be used to withdraw your funds."
        >
          <VerificationStatus status={profile.bank_verification_status} />
          <CurrencySelector
            value={targetCurrency}
            currencies={currencies}
            onChange={setTargetCurrency}
            classes="w-60 md:w-80"
          />
          <ExpectedFunds
            onChange={(value) => {
              // if new value is 0 (zero), no need to debounce, but
              // still call the function itself to cancel the previous call
              const delay = !value ? 0 : 1000;
              debounce(() => setExpectedFunds(value), delay);
            }}
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
