import type { TStatus } from "@better-giving/banking-applications";
import { NavLink } from "@remix-run/react";
import TableSection, { Cells } from "components/table-section";
import { appRoutes } from "constants/routes";
import { toPP } from "helpers/date";
import { Folder } from "lucide-react";
import LoadMoreBtn from "./load-more-btn";
import type { TableProps } from "./types";

export function Table({
  items,
  classes = "",
  disabled,
  loading,
  load_next,
}: TableProps) {
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
          <>Date</>
          <>Endowment</>
          <>Account</>
          <th className="text-center">Status</th>
          <th className="text-center">Details</th>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="even:bg-blue-l5 dark:odd:bg-blue-d6 dark:even:bg-blue-d7 divide-x divide-blue-l2"
        selectedClass="bg-blue-l4 dark:bg-blue-d4"
      >
        {items
          .map((row) => (
            <Cells
              key={row.id}
              type="td"
              cellClass={`p-3 border-t border-blue-l2 max-w-[256px] truncate ${
                load_next ? "" : "first:rounded-bl last:rounded-br"
              }`}
            >
              <>{toPP(row.date_created)}</>
              <>{row.npo_id}</>
              <>{row.bank_summary}</>
              <td className="text-center">
                <Status status={row.status} />
              </td>
              <NavLink
                to={appRoutes.banking_applications + `/${row.id}`}
                className="text-center w-full inline-block hover:text-blue-d1 [&:is(.pending)]:text-gray [&:is(.pending)]:pointer-events-none"
              >
                <Folder
                  size={22}
                  aria-label="bank statement file"
                  className="inline-block"
                />
              </NavLink>
            </Cells>
          ))
          .concat(
            load_next ? (
              <td
                colSpan={9}
                key="load-more-btn"
                className="border-t border-blue-l2 rounded-b"
              >
                <LoadMoreBtn
                  onLoadMore={load_next}
                  disabled={disabled}
                  isLoading={loading}
                />
              </td>
            ) : (
              []
            )
          )}
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
