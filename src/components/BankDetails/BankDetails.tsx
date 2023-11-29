import { useState } from "react";
import { FormButtonsProps } from "./types";
import { CreateRecipientRequest } from "types/aws";
import { FileDropzoneAsset } from "types/components";
import Divider from "components/Divider";
import LoaderRing from "components/LoaderRing";
import useDebounce from "hooks/useDebounce";
import { isEmpty } from "helpers";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import CurrencySelector from "./CurrencySelector";
import ExpectedFunds from "./ExpectedFunds";
import RecipientDetails from "./RecipientDetails";
import UpdateDetailsButton from "./UpdateDetailsButton";
import useCurrencies from "./useCurrencies";

type Props = {
  alreadySubmitted?: boolean;
  isSubmitting: boolean;
  FormButtons: React.ComponentType<FormButtonsProps>;
  onSubmit: (
    request: CreateRecipientRequest,
    bankStatementFile: FileDropzoneAsset,
    isDirty: boolean
  ) => Promise<void>;
};

export default function BankDetails({
  alreadySubmitted = false,
  isSubmitting,
  onSubmit,
  FormButtons,
}: Props) {
  const [shouldUpdate, setShouldUpdate] = useState(!alreadySubmitted);
  const [expectedMontlyDonations, setExpectedMontlyDonations] =
    useState<number>();
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

  if (!shouldUpdate) {
    return (
      <div className="flex flex-col h-full justify-between">
        <UpdateDetailsButton onClick={() => setShouldUpdate(true)} />
        <FormButtons
          disabled={true}
          isSubmitting={false}
          newRequirementsAdded={false}
          refreshRequired={true}
          alreadySubmitted={true}
        />
      </div>
    );
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
          // if new value is empty or 0 (zero), no need to debounce, but
          // still call the function itself to cancel the previous debounce call
          const delay = !value ? 0 : 1000;
          debounce(() => setExpectedMontlyDonations(value), delay);
        }}
      />

      {/* Display disabled form buttons by default, this is necessary 
          to be able to show "Back" button during registration */}
      {!expectedMontlyDonations ? (
        <FormButtons
          disabled={true}
          isSubmitting={false}
          newRequirementsAdded={false}
          refreshRequired={true}
          alreadySubmitted={false}
        />
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
                // it needs to reset its state by re-rendering the whole component.
                // This way the `react-hook-form` reruns the `useForm` initializer function with the new requirements
                // that will get loaded due to changed target currency and expected montly donation (in Wise terms: source amount).
                key={`${targetCurrency.code}${expectedMontlyDonations}`}
                targetCurrency={targetCurrency.code}
                expectedMontlyDonations={expectedMontlyDonations}
                isSubmitting={isSubmitting}
                onSubmit={onSubmit}
                FormButtons={FormButtons}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
