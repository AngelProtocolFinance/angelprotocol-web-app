import { MaskedInput } from "components/form";
import { dollar } from "components/form/masks";
import { Separator } from "components/separator";
import { APP_NAME } from "constants/env";
import useDebouncer from "hooks/use-debouncer";
import { useState } from "react";
import type { WiseCurrencyOption } from "types/components";
import { CurrencySelector } from "../currency-selector";
import RecipientDetails from "./recipient-details";
import type { IFormButtons, OnSubmit } from "./types";
import { use_currencies } from "./use-currencies";

/**
 * Denominated in USD
 */
const DEFAULT_EXPECTED_MONTHLY_DONATIONS_AMOUNT = "1000";

type Props = {
  FormButtons: IFormButtons;
  /** All errors should be handled inside `onSubmit` */
  onSubmit: OnSubmit;
  isLoading: boolean;
  verified?: boolean;
};

export function BankDetails({
  FormButtons,
  onSubmit,
  isLoading,
  verified,
}: Props) {
  const currencies = use_currencies();
  const [isSubmitting, setSubmitting] = useState(false);
  const [currency, setCurrency] = useState<WiseCurrencyOption>({
    code: "USD",
    name: "United States Dollar",
    rate: null,
  });

  const [amount, setAmount] = useState(
    DEFAULT_EXPECTED_MONTHLY_DONATIONS_AMOUNT
  );
  const [debounced_amount] = useDebouncer(amount, 500);

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
      <MaskedInput
        id="expected-monthly-donations"
        label="What is the amount you expect to receive monthly on our
        platform?"
        sub={
          <p className="text-gray text-sm my-2 italic">
            Depending on how much you expect to receive each month via{" "}
            {APP_NAME}, different details are required. At this point, we
            recommend using a conservative figure - Maybe $1000 per month.
          </p>
        }
        mask={dollar.opts}
        value={dollar.mask(+amount)}
        onChange={(amount) => setAmount(dollar.unmask(amount).toString())}
        classes={{ input: "md:w-80" }}
        disabled={isSubmitting}
      />

      <Separator classes="before:bg-gray-l3 after:bg-gray-l3 dark:before:bg-gray-d1 dark:after:bg-gray-d1" />

      <RecipientDetails
        verified={verified}
        amount={+debounced_amount}
        currency={currency.code}
        disabled={isSubmitting || isLoading}
        FormButtons={FormButtons}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
