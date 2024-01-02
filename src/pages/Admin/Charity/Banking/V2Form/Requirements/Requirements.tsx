import { useRequirementsQuery } from "services/aws/wise";
import useDebouncer from "hooks/useDebouncer";

type Props = {
  currency: string;
  amount: string;
};

export default function Requirements({ currency, amount }: Props) {
  const [debouncedAmount, isDebouncing] = useDebouncer(amount, 500);

  const amnt = /^[1-9]\d*$/.test(debouncedAmount) ? +debouncedAmount : 0;
  const { data: requirements = [], requestId } = useRequirementsQuery(
    {
      amount: amnt,
      currency,
    },
    { skip: !amnt || isDebouncing }
  );

  console.log({ debouncedAmount, amnt, requirements, requestId, isDebouncing });

  return <div>requirements</div>;
}
