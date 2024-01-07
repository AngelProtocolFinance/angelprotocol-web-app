import { ComponentType, useState } from "react";
import { FormButtonsProps } from "./types";
import { V1RecipientAccount, WiseCurrency } from "types/aws";
import Divider from "components/Divider";
import useDebouncer from "hooks/useDebouncer";
import CurrencySelector from "./CurrencySelector";
import ExpectedFunds from "./ExpectedFunds";
import RecipientDetails from "./RecipientDetails";

/**
 * Denominated in USD
 */
const DEFAULT_EXPECTED_MONTHLY_DONATIONS_AMOUNT = "1000";

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
  const [amount, setAmount] = useState(
    DEFAULT_EXPECTED_MONTHLY_DONATIONS_AMOUNT
  );
  const [debouncedAmount] = useDebouncer(amount, 500);
  const amnt = /^[1-9]\d*$/.test(debouncedAmount) ? +debouncedAmount : 0;

  return (
    <div className="grid gap-6">
      <CurrencySelector
        onChange={(c) => setCurrency(c)}
        value={currency}
        disabled={false}
        classes={{ combobox: "w-full md:w-80" }}
      />
      <ExpectedFunds
        value={amount}
        onChange={(amount) => setAmount(amount)}
        classes={{ input: "md:w-80" }}
      />

      <Divider />

      <RecipientDetails amount={amnt} currency={currency.code} />
    </div>
  );
}
