import { BankingApplicationStatus, PayoutMethod } from "types/aws";
import TableSection, { Cells } from "components/TableSection";

type Props = {
  methods: PayoutMethod[];
  classes?: string;
};

export default function Table({ methods, classes = "" }: Props) {
  return (
    <table
      className={`${classes} w-full text-sm rounded border border-separate border-spacing-0 border-prim`}
    >
      <TableSection
        type="thead"
        rowClass="bg-orange-l6 dark:bg-blue-d7 divide-x divide-prim"
      >
        <Cells
          type="th"
          cellClass="px-3 py-4 text-xs uppercase font-semibold text-left first:rounded-tl last:rounded-tr"
        >
          <>Date</>
          <>Endowment</>
          <>Bank name</>
          <>Account number</>
          <>Currency</>
          <th className="text-center">Status</th>
          <th className="text-center">Bank Statement</th>
          <></>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="even:bg-orange-l6 dark:odd:bg-blue-d6 dark:even:bg-blue-d7 divide-x divide-prim"
        selectedClass="bg-orange-l5 dark:bg-blue-d4"
      >
        {methods.map((row) => (
          <Cells
            key={row.wiseRecipientID}
            type="td"
            cellClass="p-3 border-t border-prim max-w-[256px] truncate first:rounded-bl last:rounded-br"
          >
            <>{row.bankName}</>
            <>{row.bankAccountNumber}</>
            <>{row.payoutCurrency}</>
            <td className="text-center">
              <Status status={row.status} />
            </td>
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
