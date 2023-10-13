import { useEffect, useState } from "react";
import { AccountRequirementsField } from "./types";
import getAccountRequirementOptions from "./getAccountRequirementOptions";

export default function AccountRequirementsSelector({
  targetCurrency,
  sourceAmount,
  onChange,
}: {
  targetCurrency: string;
  sourceAmount?: number;
  onChange: (newAccountRequirements: AccountRequirementsField) => void;
}) {
  const [accountRequirementsOptions, setAccountRequirementsOptions] =
    useState<AccountRequirementsField[]>();

  useEffect(() => {
    getAccountRequirementOptions(targetCurrency, sourceAmount).then((res) => {
      setAccountRequirementsOptions(res);
    });
  }, [targetCurrency]);

  if (!accountRequirementsOptions) {
    return <span>Loading...</span>;
  }

  return (
    <div className="flex flex-col gap-2">
      <span>Choose a transfer type:</span>
      <div className="flex gap-2">
        {accountRequirementsOptions.map((accountRequirements) => (
          <button
            id={accountRequirements.type}
            type="button"
            onClick={() => onChange(accountRequirements)}
            className="btn-blue text-sm w-40"
          >
            {accountRequirements.title}
          </button>
        ))}
      </div>
    </div>
  );
}
