import { Label } from "components/form";
import { Select } from "components/selector/select";
import { Info, LoadingStatus } from "components/status";
import { memo, useState } from "react";
import type { IFormButtons, OnSubmit } from "../types";
import { RecipientDetailsForm } from "./recipient-details-form";
import { use_requirements } from "./use-requirements";

type Props = {
  disabled: boolean;
  currency: string;
  amount: number;
  FormButtons: IFormButtons;
  onSubmit: OnSubmit;
  verified?: boolean;
};

function _RecipientDetails({
  amount,
  currency,
  disabled,
  FormButtons,
  onSubmit,
  verified,
}: Props) {
  const { req } = use_requirements(!amount ? null : { amount, currency });
  const { data, isLoading, isValidating, error } = req;
  const requirements = data?.requirements || [];
  const [selected_idx, set_selected_idx] = useState(0);

  // when num options is reduced from current selected, revert to first option
  const req_idx = selected_idx + 1 > requirements.length ? 0 : selected_idx;

  if (isLoading) {
    return (
      <LoadingStatus classes="text-blue-d1 text-sm">
        Loading requirements...
      </LoadingStatus>
    );
  }

  if (amount === 0) {
    return (
      <Info classes="text-sm">Please enter expected donation amount.</Info>
    );
  }

  if (requirements.length === 0 || error) {
    return (
      <Info classes="text-sm">
        Target currency <span className="font-semibold">{currency}</span> is not
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
      <div className="">
        <Label required className="mb-2">
          Transfer type
        </Label>
        <Select
          value={selected_idx.toString()}
          onChange={(value) => set_selected_idx(+value)}
          options={requirements.map((_, i) => i.toString())}
          option_disp={(x) => requirements[+x].title}
          disabled={disabled || isValidating}
          classes={{ options: "text-sm" }}
        />
      </div>

      <RecipientDetailsForm
        verified={verified}
        disabled={disabled}
        quoteId={req.data?.quoteId ?? ""}
        type={requirements[req_idx].type}
        currency={currency}
        amount={amount}
        fields={requirements[req_idx]?.fields.flatMap((f) => f.group) || []}
        FormButtons={FormButtons}
        onSubmit={onSubmit}
      />
    </>
  );
}

export const RecipientDetails = memo(_RecipientDetails);
