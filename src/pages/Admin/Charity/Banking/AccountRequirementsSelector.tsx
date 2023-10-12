import { useEffect, useState } from "react";
import { AccountRequirements } from "./types";
import getAccountRequirementOptions from "./getAccountRequirementOptions";

export default function AccountRequirementsSelector({
  targetCurrency,
  onChange,
}: {
  targetCurrency: string;
  onChange: (newAccountRequirements: AccountRequirements) => void;
}) {
  const [accountRequirementsOptions, setAccountRequirementsOptions] =
    useState<AccountRequirements[]>();

  useEffect(() => {
    getAccountRequirementOptions(targetCurrency).then((res) => {
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
