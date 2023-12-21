import { useState } from "react";
import { IFormButtons, OnSubmit } from "./types";
import { useCurrencisQuery } from "services/aws/wise";
import Divider from "components/Divider";
import useDebouncer from "hooks/useDebouncer";
import CurrencySelector, { Currency } from "../CurrencySelector";
import ExpectedFunds from "./ExpectedFunds";
import RecipientDetails from "./RecipientDetails";

/**
 * Denominated in USD
 */
const DEFAULT_EXPECTED_MONTHLY_DONATIONS_AMOUNT = "1000";

type Props = {
  FormButtons: IFormButtons;
  onSubmit: OnSubmit;
};

export default function BankDetails({ FormButtons, onSubmit }: Props) {
  const [isSubmitting, setSubmitting] = useState(false);
  const [currency, setCurrency] = useState<Currency>({
    code: "USD",
    name: "United States Dollar",
  });
  const [amount, setAmount] = useState(
    DEFAULT_EXPECTED_MONTHLY_DONATIONS_AMOUNT
  );
  const [debouncedAmount] = useDebouncer(amount, 500);
  const amnt = /^[1-9]\d*$/.test(debouncedAmount) ? +debouncedAmount : 0;

  const handleSubmit: OnSubmit = async (...params) => {
    setSubmitting(true);
    await onSubmit(...params);
    setSubmitting(false);
  };

  const { data: currencies = [] } = useCurrencisQuery({});

  return (
    <div className="grid gap-6">
      <CurrencySelector
        currencies={currencies}
        onChange={(c) => setCurrency(c)}
        value={currency}
        classes={{ combobox: "w-full md:w-80" }}
        disabled={isSubmitting}
        label="Select your bank account currency:"
      />
      <ExpectedFunds
        value={amount}
        onChange={(amount) => setAmount(amount)}
        classes={{ input: "md:w-80" }}
        disabled={isSubmitting}
      />

      <Divider />

      <RecipientDetails
        amount={amnt}
        currency={currency.code}
        disabled={isSubmitting}
        FormButtons={FormButtons}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
