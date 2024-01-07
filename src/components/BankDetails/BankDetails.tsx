import { ComponentType, useState } from "react";
import { FormButtonsProps } from "./types";
import {
  CreateRecipientRequest,
  V1RecipientAccount,
  WiseCurrency,
} from "types/aws";
import Divider from "components/Divider";
import LoaderRing from "components/LoaderRing";
import useDebounce from "hooks/useDebounce";
import useDebouncer from "hooks/useDebouncer";
import { isEmpty } from "helpers";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import CurrencySelector from "./CurrencySelector";
import ExpectedFunds from "./ExpectedFunds";
import RecipientDetails from "./RecipientDetails";
import useCurrencies from "./useCurrencies";

/**
 * Denominated in USD
 */
const DEFAULT_EXPECTED_MONTHLY_DONATIONS_AMOUNT = 1000;

type Props = {
  isSubmitting: boolean;
  FormButtons: ComponentType<FormButtonsProps>;
  onSubmit: (
    recipient: V1RecipientAccount,
    bankStatementFile: File
  ) => Promise<void>;
};

export default function BankDetails({
  FormButtons,
  isSubmitting,
  onSubmit,
}: Props) {
  const [currency, setCurrency] = useState<Pick<WiseCurrency, "code" | "name">>(
    { code: "USD", name: "United States Dollar" }
  );
  const [amount, setAmount] = useState("1000");
  const [debouncedAmount] = useDebouncer(amount, 500);
  const amnt = /^[1-9]\d*$/.test(debouncedAmount) ? +debouncedAmount : 0;

  return (
    <div className="grid gap-6">
      <CurrencySelector
        value={targetCurrency}
        currencies={currencies}
        onChange={setTargetCurrency}
        classes={{ combobox: "w-full md:w-80" }}
        disabled={isSubmitting}
      />
      <ExpectedFunds
        classes={{ input: "md:w-80" }}
        disabled={isSubmitting}
        onChange={(value) => {
          // if value is empty or 0 (zero), use the default value so that there's some form to show
          const newValue = value || DEFAULT_EXPECTED_MONTHLY_DONATIONS_AMOUNT;
          // if new value is the same as the current value, then there's no need to debounce,
          // but still call the function to cancel the previous debounce call
          const delay = newValue === expectedMontlyDonations ? 0 : 1000;
          debounce(() => setExpectedMontlyDonations(newValue), delay);
        }}
      />

      <Divider />

      <RecipientDetails
        // we need this key to tell React that when currency code changes,
        // it needs to reset its state by re-rendering the whole component.
        key={targetCurrency.code}
        isLoading={isDebouncing}
        currency={targetCurrency}
        expectedMontlyDonations={expectedMontlyDonations}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        FormButtons={FormButtons}
      />
    </div>
  );
}
