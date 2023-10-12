import { useEffect, useState } from "react";
import { AccountRequirements } from "./types";
import AccountRequirementsSelector from "./AccountRequirementsSelector";
import CurrencySelector from "./CurrencySelector";
import RecipientDetailsForm from "./RecipientDetailsForm";

export default function Banking() {
  const [targetCurrency, setTargetCurrency] = useState<string>();
  const [accountRequirements, setAccountRequirements] =
    useState<AccountRequirements>();

  useEffect(() => setAccountRequirements(undefined), [targetCurrency]);

  return (
    <div className="flex flex-col gap-5">
      <CurrencySelector
        value={targetCurrency}
        onChange={(currency: string) => setTargetCurrency(currency)}
      />

      {!!targetCurrency && (
        <>
          <AccountRequirementsSelector
            targetCurrency={targetCurrency}
            onChange={(newAccountRequirements: AccountRequirements) =>
              setAccountRequirements(newAccountRequirements)
            }
          />
          {!!accountRequirements && (
            <RecipientDetailsForm
              targetCurrency={targetCurrency}
              accountRequirements={accountRequirements}
            />
          )}
        </>
      )}
    </div>
  );
}
