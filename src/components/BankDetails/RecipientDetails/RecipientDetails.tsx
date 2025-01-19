import { NativeSelect } from "components/Selector";
import { Info, LoadingStatus } from "components/Status";
import { Label } from "components/form";
import { isEmpty } from "helpers";
import { memo, useState } from "react";
import type { IFormButtons, OnSubmit } from "../types";
import RecipientDetailsForm from "./RecipientDetailsForm";
import { useRequirements } from "./use-requirements";

type Props = {
  disabled: boolean;
  currency: string;
  amount: number;
  FormButtons: IFormButtons;
  onSubmit: OnSubmit;
};

function RecipientDetails({
  amount,
  currency,
  disabled,
  FormButtons,
  onSubmit,
}: Props) {
  const { req } = useRequirements(!amount ? null : { amount, currency });
  const { data, isLoading, isValidating, error } = req;
  const requirements = data?.requirements || [];
  const [selectedIdx, setSelectedIdx] = useState(0);

  // when num options is reduced from current selected, revert to first option
  const reqIdx = selectedIdx + 1 > requirements.length ? 0 : selectedIdx;

  if (isLoading) {
    return (
      <LoadingStatus classes="text-blue-d1 text-sm">
        Loading requirements...
      </LoadingStatus>
    );
  }

  if (isEmpty(requirements) || error) {
    return (
      <Info classes="text-sm">
        Target currency <span className="font-bold">{currency}</span> is not
        supported. Please use a bank account with a different currency.
      </Info>
    );
  }

  return (
    <>
      {isValidating && (
        <LoadingStatus classes="text-blue-d1 text-xs">
          Refreshing requirements..
        </LoadingStatus>
      )}
      <div className="field">
        <Label required>Transfer type</Label>
        <NativeSelect
          value={selectedIdx}
          onChange={(value) => setSelectedIdx(+value)}
          options={requirements.map((x, i) => ({ label: x.title, value: i }))}
          disabled={disabled || isValidating}
          classes={{ options: "text-sm" }}
        />
      </div>

      <RecipientDetailsForm
        disabled={disabled}
        quoteId={req.data?.quoteId ?? ""}
        type={requirements[reqIdx].type}
        currency={currency}
        amount={amount}
        fields={requirements[reqIdx]?.fields.flatMap((f) => f.group) || []}
        FormButtons={FormButtons}
        onSubmit={onSubmit}
      />
    </>
  );
}

export default memo(RecipientDetails);
