import { useEffect, useState } from "react";
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

export default function Banking() {
  const [expectedFunds, setExpectedFunds] = useState<number>();
  const [targetCurrency, setTargetCurrency] = useState<Currency>();

  const [debounce, isDebouncing] = useDebounce();

  const { currencies, isError, isLoading } = useCurrencies();

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

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <LoaderRing thickness={10} classes="w-6" /> Loading...
      </div>
    );
  }

  if (isError || !targetCurrency || isEmpty(currencies)) {
    return (
      <span>
        An error occurred. Please try again later. If the error persists, please
        contact {EMAIL_SUPPORT}.
      </span>
    );
  }

  return (
    <div className="grid">
      <div className="grid gap-5 max-w-4xl justify-self-center">
        <Group
          title="Bank account details"
          description="The following information will be used to register your bank account that will be used to withdraw your funds."
        >
          <VerificationStatus />
          <CurrencySelector
            value={targetCurrency}
            currencies={currencies}
            onChange={setTargetCurrency}
            classes="w-60 md:w-80"
          />
          <ExpectedFunds
            onChange={(ef) => debounce(() => setExpectedFunds(ef), 1000)}
          />

          {!!expectedFunds && (
            <>
              <Divider />
              <div className="min-h-[20rem]">
                <RecipientDetails
                  // we need this key to tell React that when any of the fields passed to this component changes,
                  // it needs to reset its state by rerendering the whole component
                  key={`${targetCurrency.code}${expectedFunds}`}
                  targetCurrency={targetCurrency.code}
                  expectedFunds={expectedFunds}
                  isLoading={isDebouncing}
                />
              </div>
            </>
          )}
        </Group>
      </div>
    </div>
  );
}
