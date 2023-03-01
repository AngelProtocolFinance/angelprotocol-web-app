import { TFee, TFees } from "slices/launchpad/types";
import { isEmpty } from "helpers";
import Section, { SectionProps } from "./Section";

export default function Fees({
  fees,
  ...props
}: SectionProps<{ fees: TFees }>) {
  const _fees = Object.entries(fees).reduce(
    (result, [key, fee]) =>
      fee.isActive ? [...result, <Fee key={key} {...fee} />] : result,
    [] as JSX.Element[]
  );

  return (
    <Section {...props}>
      {isEmpty(_fees) ? <p>No additional fees set</p> : _fees}
    </Section>
  );
}

function Fee({ receiver, rate }: TFee) {
  return (
    <div className="grid grid-cols-[auto_1fr]">
      <p className="col-span-full">Withrawal fee</p>
      <span>{receiver}</span>
      <span>{rate}%</span>
    </div>
  );
}
