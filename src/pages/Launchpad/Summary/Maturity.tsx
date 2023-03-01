import { TMaturity } from "slices/launchpad/types";
import TableSection, { Cells } from "components/TableSection";
import { isEmpty } from "helpers";
import Info from "../common/Info";
import Section, { SectionProps } from "./Section";

export default function Maturity({
  date,
  beneficiaries,
  ...props
}: SectionProps<TMaturity>) {
  const _beneficiaries = beneficiaries.map(({ addr, share }) => (
    <Cells type="td" cellClass="">
      <>{addr}</>
      <>{share} %</>
    </Cells>
  ));

  return (
    <Section {...props}>
      <div className="mb-6">
        <span className="font-semibold">Maturity date: </span>
        <span>{new Date(date).toLocaleDateString()}</span>
      </div>
      <p className="font-semibold mb-2">Maturity Whitelist:</p>
      {isEmpty(_beneficiaries) ? (
        <Info>To be created multisig wallet is the only beneficiary</Info>
      ) : (
        <table>
          <TableSection type="tbody" rowClass="">
            {beneficiaries.map(({ addr, share }) => (
              <Cells type="td" cellClass="" key={addr}>
                <>{addr}</>
                <>{share} %</>
              </Cells>
            ))}
          </TableSection>
        </table>
      )}
    </Section>
  );
}
