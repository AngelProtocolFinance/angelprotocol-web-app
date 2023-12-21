import { memo, useState } from "react";
import { IFormButtons, OnSubmit } from "../types";
import { useRequirementsQuery } from "services/aws/wise";
import { Info, LoadingStatus } from "components/Status";
import { Label } from "components/form";
import { isEmpty } from "helpers";
import RecipientDetailsForm from "./RecipientDetailsForm";

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
  const { data, isLoading, isError, isFetching } = useRequirementsQuery(
    {
      amount,
      currency,
    },
    { skip: !amount }
  );

  const requirements = data?.requirements || [];
  const [selectedIdx, setSelectedIdx] = useState(0);

  // when num options is reduced from current selected, revert to first option
  const reqIdx = selectedIdx + 1 > requirements.length ? 0 : selectedIdx;

  if (isLoading) {
    return (
      <LoadingStatus classes="text-orange text-sm">
        Loading requirements...
      </LoadingStatus>
    );
  }

  if (isEmpty(requirements) || isError) {
    return (
      <Info classes="text-sm">
        Target currency <span className="font-bold">{currency}</span> is not
        supported. Please use a bank account with a different currency.
      </Info>
    );
  }

  return (
    <>
      {isFetching && (
        <LoadingStatus classes="text-orange text-xs">
          Refreshing requirements..
        </LoadingStatus>
      )}
      <div>
        <Label className="mb-2" required>
          Transfer type
        </Label>
        <select
          value={reqIdx}
          onChange={(e) => setSelectedIdx(+e.target.value)}
          disabled={disabled || isFetching}
          className="field-input"
        >
          {requirements.map((v, i) => (
            <option key={v.type} value={i}>
              {v.title}
            </option>
          ))}
        </select>
      </div>

      <RecipientDetailsForm
        disabled={disabled || isFetching}
        quoteId={data?.quoteId ?? ""}
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
