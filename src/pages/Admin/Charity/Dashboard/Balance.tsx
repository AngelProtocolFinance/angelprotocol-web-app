import { PropsWithChildren } from "react";
import { humanize } from "helpers";

type Props = {
  type: "Sustainability Fund" | "Donations";
  current: number;
  pending: number;
  payedOut: number;
};

export default function Balance({ type, current, pending, payedOut }: Props) {
  return (
    <div className="@container rounded border border-prim bg-orange-l6 dark:bg-blue-d6 p-4">
      <h4 className="uppercase text-sm @xs:text-xl font-bold mb-5">
        {type} account
      </h4>
      <div className="grid @xs:grid-cols-[auto_1fr] gap-y-5 justify-self-start gap-x-2 @xs:gap-x-8">
        <Amount
          title="Total Current Contributions"
          classes="col-span-full @xs:mr-auto"
        >
          {humanize(current, 2)}
        </Amount>
        <Amount title="Pending payout">{humanize(pending, 2)}</Amount>
        <Amount title="Paid out">{humanize(payedOut, 2)}</Amount>
      </div>
    </div>
  );
}

function Amount({
  classes = "",
  ...props
}: PropsWithChildren<{ classes?: string; title: string }>) {
  return (
    <div className={classes}>
      <p className="text-2xs @xs:text-xs text-gray-d1 dark:text-gray @xs:mb-1 uppercase">
        {props.title}
      </p>
      <span className="font-bold text-sm @xs:text-xl font-heading">
        {props.children}{" "}
        <span className="text-2xs @xs:text-xs font-normal">USD</span>
      </span>
    </div>
  );
}
