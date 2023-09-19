import { Link } from "react-router-dom";
import { Transaction } from "types/tx";
import Icon from "components/Icon";
import TableSection, { Cells } from "components/TableSection";
import { adminRoutes } from "constant/routes";

type Props = { proposals: Transaction[] };
export default function Table({ proposals }: Props) {
  return (
    <table>
      <TableSection
        rowClass="border-b border-gray-l3 dark:border-bluegray"
        type="thead"
      >
        <Cells type="th" cellClass="p-1.5 uppercase text-left font-heading">
          <>title</>
          <>status</>
          <>expiry</>
        </Cells>
      </TableSection>
      <TableSection
        rowClass="last:border-none border-b border-gray-l3 dark:border-bluegray hover:bg-blue-l4 hover:dark:bg-blue-d4"
        type="tbody"
      >
        {proposals.map(({ meta, status, transactionId, recordId }) => (
          <Cells type="td" cellClass="p-1.5" key={recordId}>
            <>{meta?.title ?? `Multisig transaction: ${transactionId}`}</>
            <span className="uppercase text-sm">{status}</span>
            <Link
              to={`${adminRoutes.proposal}/${recordId}`}
              className="flex items-center uppercase text-sm hover:bg-blue-l4 hover:dark:bg-blue-d4"
            >
              <span>Details</span>
              <Icon type="Forward" />
            </Link>
          </Cells>
        ))}
      </TableSection>
    </table>
  );
}
