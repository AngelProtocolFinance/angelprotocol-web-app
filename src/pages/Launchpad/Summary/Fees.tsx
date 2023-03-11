import { TFee, TFees } from "slices/launchpad/types";
import { isEmpty } from "helpers";
import Info from "../common/Info";
import Section, { SectionProps } from "./Section";

export default function Fees({
  fees,
  ...props
}: SectionProps<{ fees: TFees }>) {
  const _fees = Object.entries(fees).reduce(
    (result, [key, fee]) =>
      fee.isActive
        ? [...result, <Fee key={key} {...fee} name={key} />]
        : result,
    [] as JSX.Element[]
  );

  return (
    <Section {...props}>
      {isEmpty(_fees) ? (
        <Info>No additional fees set</Info>
      ) : (
        <div className="grid gap-6">{_fees}</div>
      )}
    </Section>
  );
}

function Fee({ receiver, rate, name }: TFee & { name: string }) {
  return (
    <div className="grid grid-cols-[auto_1fr] ">
      <p className="col-span-full capitalize font-semibold mb-2">{name} fee</p>
      <span className="mr-6">{receiver}</span>
      <span className="font-semibold">{rate}%</span>
    </div>
  );
}
