import { ReactNode, useState } from "react";
import { CreateRecipientRequest } from "types/aws";
import { FileDropzoneAsset } from "types/components";
import Divider from "components/Divider";
import LoaderRing from "components/LoaderRing";
import useDebounce from "hooks/useDebounce";
import { isEmpty } from "helpers";
import { EMAIL_SUPPORT } from "constants/env";
import CurrencySelector from "./CurrencySelector";
import ExpectedFunds from "./ExpectedFunds";
import RecipientDetails from "./RecipientDetails";
import UpdateDetailsButton from "./UpdateDetailsButton";
import useCurrencies from "./useCurrencies";

type Props = {
  disabled?: boolean;
  children: (
    disabled: boolean,
    isSubmitting: boolean,
    refreshRequired: boolean
  ) => ReactNode;
  onSubmit: (
    request: CreateRecipientRequest,
    bankStatementFile: FileDropzoneAsset,
    isDirty: boolean
  ) => Promise<void>;
};

export default function BankDetails({
  disabled = false,
  onSubmit,
  children,
}: Props) {
  const [resubmitRequired, setResubmitRequired] = useState(false);
  const [expectedMontlyDonations, setExpectedMontlyDonations] =
    useState<number>();
  const [debounce, isDebouncing] = useDebounce();

  const { currencies, isLoading, targetCurrency, setTargetCurrency } =
    useCurrencies();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2">
        <LoaderRing thickness={10} classes="w-6" /> Loading...
      </div>
    );
  }

  if (isEmpty(currencies) || !targetCurrency) {
    return (
      <span>
        An error occurred. Please try again later. If the error persists, please
        contact {EMAIL_SUPPORT}.
      </span>
    );
  }

  return (
    <div className="grid gap-6">
      {disabled && !resubmitRequired && (
        <UpdateDetailsButton
          className="my-4"
          onClick={() => setResubmitRequired(true)}
        />
      )}
      <CurrencySelector
        value={targetCurrency}
        currencies={currencies}
        onChange={setTargetCurrency}
        classes="w-60 md:w-80"
        disabled={disabled}
      />
      <ExpectedFunds
        onChange={(value) => {
          // if new value is empty or 0 (zero), no need to debounce, but
          // still call the function itself to cancel the previous debounce call
          const delay = !value ? 0 : 1000;
          debounce(() => setExpectedMontlyDonations(value), delay);
        }}
        disabled={disabled}
      />

      {/* Display disabled form buttons by default, this is necessary 
          to be able to show "Back" button during registration */}
      {!expectedMontlyDonations ? (
        children(true, false, true)
      ) : (
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
                key={`${targetCurrency.code}${expectedMontlyDonations}`}
                targetCurrency={targetCurrency.code}
                expectedMontlyDonations={expectedMontlyDonations}
                disabled={disabled}
                onSubmit={onSubmit}
              >
                {children}
              </RecipientDetails>
            )}
          </div>
        </>
      )}
    </div>
  );
}
