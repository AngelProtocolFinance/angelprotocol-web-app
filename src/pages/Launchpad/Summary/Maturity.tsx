import { TMaturity } from "slices/launchpad/types";
import { Info } from "components/Status";
import { Cells } from "components/TableSection";
import { isEmpty } from "helpers";
import Section, { SectionProps } from "./Section";

export default function Maturity({
  willMature,
  date,
  beneficiaries,
  ...props
}: SectionProps<TMaturity>) {
  const _beneficiaries = beneficiaries.map((beneficiary) => (
    <Cells type="td" cellClass="">
      <>{beneficiary}</>
    </Cells>
  ));

  return (
    <Section {...props}>
      {willMature ? (
        <>
          <div className="mb-6">
            <span className="font-semibold">Maturity date: </span>
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
          <p className="font-semibold mb-2">Maturity Whitelist:</p>
          {isEmpty(_beneficiaries) ? (
            <Info>
              No whitelist has been set - the Admin wallet will be the only
              beneficiary at maturity
            </Info>
          ) : (
            <ul className="grid gap-y-2 list-disc list-inside">
              {beneficiaries.map((beneficiary) => (
                <li key={beneficiary} className="">
                  <span className="mr-10">{beneficiary}</span>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <Info>Maturity is not set</Info>
      )}
    </Section>
  );
}
