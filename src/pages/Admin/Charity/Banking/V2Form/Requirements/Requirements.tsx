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
  const { data: requirements = [], isLoading } = useRequirementsQuery(
    {
      amount: amnt,
      currency,
    },
    { skip: !amnt || isDebouncing }
  );

  const numReq = requirements.length;
  const [reqIdx, setReqIdx] = useState(numReq === 0 ? numReq : numReq - 1);

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (requirements.length <= 0)
    return <div>payout to ${currency} is not available</div>;

  return (
    <>
      {requirements.length > 1 && (
        <select value={reqIdx} onChange={(e) => setReqIdx(+e.target.value)}>
          {requirements.map((v, i) => (
            <option key={v.type} value={i}>
              {v.title}
            </option>
          ))}
        </select>
      )}
      <Form
        fields={requirements[reqIdx]?.fields.flatMap((f) => f.group) || []}
      />
    </>
  );
}
