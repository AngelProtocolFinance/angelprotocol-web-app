import { memo, useState } from "react";
import { useRequirementsQuery } from "services/aws/wise";
import { Info, LoadingStatus } from "components/Status";
import { Label } from "components/form";
import { isEmpty } from "helpers";
import Form from "./Form";

type Props = {
  currency: string;
  amount: number;
};

function Requirements({ currency, amount }: Props) {
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
    return <div>loading...</div>;
  }

  if (isEmpty(requirements) || isError) {
    return (
      <Info classes="text-sm">
        Payout to <span className="font-bold">{currency}</span> is currently not
        available. Please select other currency.
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
          Mode
        </Label>
        <select
          value={reqIdx}
          onChange={(e) => setSelectedIdx(+e.target.value)}
          disabled={isFetching}
          className="px-4 py-3.5 text-sm rounded border border-prim appearance-none disabled:bg-gray-l5 w-full"
        >
          {requirements.map((v, i) => (
            <option key={v.type} value={i}>
              {v.title}
            </option>
          ))}
        </select>
      </div>

      <Form
        disabled={isFetching}
        quoteId={data?.quoteId ?? ""}
        type={requirements[reqIdx].type}
        currency={currency}
        amount={amount}
        fields={requirements[reqIdx]?.fields.flatMap((f) => f.group) || []}
      />
    </>
  );
}

export default memo(Requirements);
