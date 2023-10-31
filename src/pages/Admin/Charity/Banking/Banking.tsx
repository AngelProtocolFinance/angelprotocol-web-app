import LoaderRing from "components/LoaderRing";
import { isEmpty } from "helpers";
import { EMAIL_SUPPORT } from "constants/env";
import CurrencySelector from "./CurrencySelector";
import RecipientDetails from "./RecipientDetails";
import VerificationStatus from "./VerificationStatus";
import useBanking from "./useBanking";

export default function Banking() {
  const {
    currencies,
    debouncedExpectedFunds,
    isError,
    isLoading,
    targetCurrency,
    setExpectedFunds,
    setTargetCurrency,
  } = useBanking();

  if (isLoading) {
    return (
      <div className="flex gap-2">
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
    <div className="grid gap-5 justify-start">
      <div className="flex gap-2 sm:gap-5">
        <h3 className="text-xl sm:text-2xl font-body">Bank account details</h3>
        <VerificationStatus />
      </div>

      <CurrencySelector
        value={targetCurrency}
        currencies={currencies}
        onChange={setTargetCurrency}
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="amount">
          What is amount of donations you expect to keep on our platform?
        </label>
        <input
          id="amount"
          type="number"
          onChange={(event) => setExpectedFunds(Number(event.target.value))}
          className="field-input"
        />
      </div>

      {!!targetCurrency && !!debouncedExpectedFunds && (
        <RecipientDetails
          // we need this key to tell React that when any of the fields passed to this component changes,
          // it needs to reset its state by rerendering the whole component
          key={`${targetCurrency}${debouncedExpectedFunds}`}
          targetCurrency={targetCurrency.code}
          expectedFunds={debouncedExpectedFunds}
        />
      )}
    </div>
  );
}
