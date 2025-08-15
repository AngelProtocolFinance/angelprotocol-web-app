import type { IBapp, TStatus } from "@better-giving/banking-applications";
import { NavLink } from "@remix-run/react";
import TableSection, { Cells } from "components/table-section";
import { toPP } from "helpers/date";
import { CircleCheck, FolderIcon } from "lucide-react";

type Props = {
  methods: IBapp[];
  classes?: string;
};

export default function Table({ methods, classes = "" }: Props) {
  return (
    <table
      className={`${classes} w-full text-sm rounded-sm border border-separate border-spacing-0 border-blue-l2`}
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
            key={row.id}
            type="td"
            cellClass="p-3 border-t border-blue-l2 truncate first:rounded-bl last:rounded-br"
          >
            <>{toPP(row.date_created)}</>
            <>{row.bank_summary}</>
            <td className="text-center">
              <Status status={row.status} />
            </td>
            <>
              {row.top_pn === row.this_pn && (
                <CircleCheck size={18} className="text-green-d1" />
              )}
            </>
            <NavLink
              to={row.id}
              className="[&:is(.pending)]:text-gray text-center w-full inline-block hover:text-blue-d1"
            >
              <FolderIcon
                size={22}
                aria-label="bank statement file"
                className="inline-block"
              />
            </NavLink>
          </Cells>
        ))}
      </TableSection>
    </table>
  );
}

const bg: { [key in TStatus]: string } = {
  approved: "bg-green",
  "under-review": "bg-gray-d1",
  rejected: "bg-red",
};

const text: { [key in TStatus]: string } = {
  "under-review": "Under review",
  rejected: "Rejected",
  approved: "Approved",
};

function Status({ status }: { status: TStatus }) {
  return (
    <p
      className={`${bg[status]} rounded-sm px-3 py-1 inline-block uppercase text-xs text-white`}
    >
      {text[status]}
    </p>
  );
}
