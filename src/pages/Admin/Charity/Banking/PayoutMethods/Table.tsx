import Icon from "components/Icon";
import TableSection, { Cells } from "components/TableSection";
import { Link } from "react-router-dom";
import { BankingApplicationStatus, PayoutMethod } from "types/aws";

type Props = {
  methods: PayoutMethod[];
  classes?: string;
};

export default function Table({ methods, classes = "" }: Props) {
  return (
    <table
      className={`${classes} w-full text-sm rounded border border-separate border-spacing-0 border-blue-l2`}
    >
      <TableSection
        type="thead"
        rowClass="bg-blue-l4 dark:bg-blue-d7 divide-x divide-blue-l2"
      >
        <Cells
          type="th"
          cellClass="px-3 py-4 text-xs uppercase font-semibold text-left first:rounded-tl last:rounded-tr"
        >
          <>Date submitted</>
          <>Account</>
          <th className="text-center">Status</th>
          <>default</>
          <th className="text-center">details</th>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="even:bg-blue-l5 dark:odd:bg-blue-d6 dark:even:bg-blue-d7 divide-x divide-blue-l2"
        selectedClass="bg-blue-l4 dark:bg-blue-d4"
      >
        {methods.map((row) => (
          <Cells
            key={row.wiseRecipientID}
            type="td"
            cellClass="p-3 border-t border-blue-l2 max-w-[256px] truncate first:rounded-bl last:rounded-br"
          >
            <>{new Date(row.dateCreated).toLocaleDateString()}</>
            <>{row.bankSummary}</>
            <td className="text-center">
              <Status status={row.status} />
            </td>
            <>
              {row.topPriorityNum === row.thisPriorityNum && (
                <Icon type="CheckCircle" size={18} className="text-green-d1" />
              )}
            </>
            <Link
              to={row.wiseRecipientID}
              className="text-center w-full inline-block hover:text-blue-d1"
            >
              <Icon
                size={24}
                type="Folder"
                title="bank statement file"
                className="inline-block"
              />
            </Link>
          </Cells>
        ))}
      </TableSection>
    </table>
  );
}

const bg: { [key in BankingApplicationStatus]: string } = {
  approved: "bg-green",
  "under-review": "bg-gray-d1",
  rejected: "bg-red",
};

const text: { [key in BankingApplicationStatus]: string } = {
  "under-review": "Under review",
  rejected: "Rejected",
  approved: "Approved",
};

function Status({ status }: { status: BankingApplicationStatus }) {
  return (
    <p
      className={`${bg[status]} rounded px-3 py-1 inline-block uppercase text-xs text-white`}
    >
      {text[status]}
    </p>
  );
}
