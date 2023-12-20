import { ComponentType, useState } from "react";
import { FormButtonsProps } from "./types";
import { CreateRecipientRequest } from "types/aws";
import { FileDropzoneAsset } from "types/components";
import Divider from "components/Divider";
import LoaderRing from "components/LoaderRing";
import useDebounce from "hooks/useDebounce";
import { isEmpty } from "helpers";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import CurrencySelector from "../CurrencySelector";
import ExpectedFunds from "./ExpectedFunds";
import RecipientDetails from "./RecipientDetails";
import UpdateDetailsButton from "./UpdateDetailsButton";
import useCurrencies from "./useCurrencies";

/**
 * Denominated in USD
 */
const DEFAULT_EXPECTED_MONTHLY_DONATIONS_AMOUNT = 1000;

type Props = {
  shouldUpdate: boolean;
  onInitiateUpdate: () => void;
  isSubmitting: boolean;
  FormButtons: ComponentType<FormButtonsProps>;
  onSubmit: (
    request: CreateRecipientRequest,
    bankStatementFile: FileDropzoneAsset,
    isDirty: boolean
  ) => Promise<void>;
};

export default function BankDetails({
  shouldUpdate,
  onInitiateUpdate,
  ...props
}: Props) {
  if (!shouldUpdate) {
    return (
      <div className="flex flex-col w-full justify-between mt-8 max-md:items-center">
        <UpdateDetailsButton onClick={onInitiateUpdate} />
        <props.FormButtons disabled refreshRequired isSubmitted />
      </div>
    );
  }

  return <Content {...props} />;
}

function Content({
  FormButtons,
  isSubmitting,
  onSubmit,
}: Omit<Props, "shouldUpdate" | "onInitiateUpdate">) {
  // the initial/default value will never be displayed, as ExpectedFunds displays its own internal value (empty by default)
  const [expectedMontlyDonations, setExpectedMontlyDonations] = useState(
    DEFAULT_EXPECTED_MONTHLY_DONATIONS_AMOUNT
  );

  const [debounce, isDebouncing] = useDebounce();

  const { currencies, isLoading, targetCurrency, setTargetCurrency } =
    useCurrencies();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <LoaderRing thickness={10} classes="w-6" /> Loading...
      </div>
    );
  }

  if (isEmpty(currencies) || !targetCurrency) {
    return <span>{GENERIC_ERROR_MESSAGE}</span>;
  }

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
