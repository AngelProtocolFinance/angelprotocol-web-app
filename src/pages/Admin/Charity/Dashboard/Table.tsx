import { Proposal } from "types/contracts";
import TableSection, { Cells } from "components/TableSection";

type Props = { proposals: Proposal[] };
export default function Table({ proposals }: Props) {
  return (
    <table>
      <TableSection rowClass="" type="thead">
        <Cells type="th" cellClass="">
          <>title</>
          <>status</>
          <>expiry</>
        </Cells>
      </TableSection>
      <TableSection rowClass="" type="tbody">
        {proposals.map(({ title, status, expires }) => (
          <Cells type="td" cellClass="">
            <>{title}</>
            <>{status}</>
            <>{expires}</>
          </Cells>
        ))}
      </TableSection>
    </table>
  );
}
