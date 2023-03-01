import { TMaturity } from "slices/launchpad/types";
import TableSection, { Cells } from "components/TableSection";
import { isEmpty } from "helpers";
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
      <h3>Maturity</h3>
      <div>
        <span>Maturity date:</span>
        <span>{new Date(date).toLocaleString()}</span>
      </div>
      <h5>Maturity Whitelists</h5>
      {isEmpty(_beneficiaries) ? (
        <p>To be created multisig wallet is the beneficiary</p>
      ) : (
        <table>
          <TableSection type="tbody" rowClass="">
            {beneficiaries.map(({ addr, share }) => (
              <Cells type="td" cellClass="">
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
