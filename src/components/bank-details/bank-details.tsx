import { Separator } from "components/separator";
import useDebouncer from "hooks/useDebouncer";
import { useState } from "react";
import type { Currency } from "types/components";
import CurrencySelector from "../currency-selector";
import ExpectedFunds from "./expected-funds";
import RecipientDetails from "./recipient-details";
import type { IFormButtons, OnSubmit } from "./types";
import { useCurrencies } from "./use-currencies";

/**
 * Denominated in USD
 */
const DEFAULT_EXPECTED_MONTHLY_DONATIONS_AMOUNT = "1000";

type Props = {
  FormButtons: IFormButtons;
  /** All errors should be handled inside `onSubmit` */
  onSubmit: OnSubmit;
  isLoading: boolean;
};

export default function BankDetails({
  FormButtons,
  onSubmit,
  isLoading,
}: Props) {
  const currencies = useCurrencies();
  const [isSubmitting, setSubmitting] = useState(false);
  const [currency, setCurrency] = useState<Currency>({
    code: "USD",
    name: "United States Dollar",
    rate: 1,
  });

  const [amount, setAmount] = useState(
    DEFAULT_EXPECTED_MONTHLY_DONATIONS_AMOUNT
  );
  const [debouncedAmount] = useDebouncer(amount, 500);
  const amnt = /^[1-9]\d*$/.test(debouncedAmount) ? +debouncedAmount : 0;

  const handleSubmit: OnSubmit = async (...params) => {
    try {
      setSubmitting(true);
      await onSubmit(...params);
    } catch (error) {
      // All errors should be handled in `onSubmit`.
      // This try/catch is just to ensure that `isSubmitting`
      // is set to false at the end of the operation.
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid gap-6">
      <CurrencySelector
        currencies={currencies}
        onChange={(c) => setCurrency(c)}
        value={currency}
        classes={{ combobox: "w-full md:w-80", options: "text-sm" }}
        disabled={isSubmitting || isLoading}
        label="Select your bank account currency:"
        required
      />
      <ExpectedFunds
        value={amount}
        onChange={(amount) => setAmount(amount)}
        classes={{ input: "md:w-80" }}
        disabled={isSubmitting}
      />

      <Separator classes="before:bg-gray-l3 after:bg-gray-l3 dark:before:bg-navy dark:after:bg-navy" />

      <RecipientDetails
        amount={amnt}
        currency={currency.code}
        disabled={isSubmitting || isLoading}
        FormButtons={FormButtons}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
