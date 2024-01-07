import { useState } from "react";
import { useRequirementsQuery } from "services/aws/wise";
import useDebouncer from "hooks/useDebouncer";
import Form from "./Form";

type Props = {
  currency: string;
  amount: string;
};

export default function Requirements({ currency, amount }: Props) {
  const [debouncedAmount, isDebouncing] = useDebouncer(amount, 500);

  const amnt = /^[1-9]\d*$/.test(debouncedAmount) ? +debouncedAmount : 0;
  const { data, isLoading, isError } = useRequirementsQuery(
    {
      amount: amnt,
      currency,
    },
    { skip: !amnt || isDebouncing }
  );

  const requirements = data?.requirements || [];
  const [selectedIdx, setSelectedIdx] = useState(0);

  // when num options is reduced from current selected, revert to first option
  const reqIdx = selectedIdx + 1 > requirements.length ? 0 : selectedIdx;

  if (isLoading) {
    return <div>loading...</div>;
  }

  if ((!data && !isDebouncing) || isError) {
    return <div>failed to load banking form</div>;
  }

  if (requirements.length <= 0)
    return <div>payout to ${currency} is not available</div>;

  return (
    <>
      {requirements.length > 1 && (
        <select
          value={reqIdx}
          onChange={(e) => setSelectedIdx(+e.target.value)}
        >
          {requirements.map((v, i) => (
            <option key={v.type} value={i}>
              {v.title}
            </option>
          ))}
        </select>
      )}
      <Form
        quoteId={data?.quoteId ?? ""}
        type={requirements[reqIdx].type}
        currency={currency}
        fields={requirements[reqIdx]?.fields.flatMap((f) => f.group) || []}
      />
    </>
  );
}
