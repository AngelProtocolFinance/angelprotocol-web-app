import { Tab } from "@headlessui/react";
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

  if (requirements.length <= 0)
    return <div>payout to ${currency} is not available</div>;

  if (requirements.length === 1) {
    return <div>show single requirement</div>;
  }

  return (
    <Tab.Group>
      <Tab.List className="flex gap-2">
        {requirements.map((r) => (
          <Tab key={r.type}>{r.title}</Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>Content 1</Tab.Panel>
        <Tab.Panel>Content 2</Tab.Panel>
        <Tab.Panel>Content 3</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
