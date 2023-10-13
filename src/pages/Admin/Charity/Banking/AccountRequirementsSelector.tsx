import { useEffect, useState } from "react";
import { AccountRequirements } from "./types";
import getAccountRequirementOptions from "./getAccountRequirementOptions";

export default function AccountRequirementsSelector({
  targetCurrency,
  sourceAmount,
  onChange,
}: {
  targetCurrency: string;
  sourceAmount?: number;
  onChange: (newAccountRequirements: AccountRequirements) => void;
}) {
  const [accountRequirementsOptions, setAccountRequirementsOptions] =
    useState<AccountRequirements[]>();

  useEffect(() => {
    getAccountRequirementOptions(targetCurrency, sourceAmount).then((res) => {
      setAccountRequirementsOptions(res);
    });
  }, [sourceAmount, targetCurrency]);

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
