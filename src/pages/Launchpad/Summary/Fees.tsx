import { TFee, TFees } from "slices/launchpad/types";
import { Info } from "components/Status";
import { isEmpty } from "helpers";
import Section, { SectionProps } from "./Section";

export default function Fees({
  fees: { referral_id, ...fees },
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
      <div className="grid mt-6">
        <span className="font-semibold mb-2">Referral ID:</span>
        {!referral_id ? (
          <Info>No referral ID set</Info>
        ) : (
          <span>{referral_id}</span>
        )}
      </div>
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
