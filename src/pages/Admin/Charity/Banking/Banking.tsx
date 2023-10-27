import Divider from "components/Divider";
import LoaderRing from "components/LoaderRing";
import { isEmpty } from "helpers";
import { EMAIL_SUPPORT } from "constants/env";
import { Group } from "../common";
import CurrencySelector, { Currency } from "./CurrencySelector";
import ExpectedFunds from "./ExpectedFunds";
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
            onChange={(currency: Currency) => setTargetCurrency(currency)}
            classes="w-60 md:w-80"
          />
          <ExpectedFunds onChange={setExpectedFunds} />

          {!!debouncedExpectedFunds && (
            <>
              <Divider />
              <RecipientDetails
                // we need this key to tell React that when any of the fields passed to this component changes,
                // it needs to reset its state by rerendering the whole component
                key={`${targetCurrency.code}${debouncedExpectedFunds}`}
                targetCurrency={targetCurrency.code}
                expectedFunds={debouncedExpectedFunds}
              />
            </>
          )}
        </Group>
      </div>
    </div>
  );
}
