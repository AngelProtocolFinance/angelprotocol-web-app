import { NavLink } from "@remix-run/react";
import TableSection, { Cells } from "components/TableSection";
import { appRoutes } from "constants/routes";
import { Folder } from "lucide-react";
import type { BankingApplicationStatus } from "types/aws";
import LoadMoreBtn from "./LoadMoreBtn";
import type { TableProps } from "./types";

export default function Table({
  applications,
  classes = "",
  disabled,
  isLoading,
  nextPageKey,
  onLoadMore,
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
        {applications
          .map((row) => (
            <Cells
              key={row.wiseRecipientID}
              type="td"
              cellClass={`p-3 border-t border-blue-l2 max-w-[256px] truncate ${
                nextPageKey ? "" : "first:rounded-bl last:rounded-br"
              }`}
            >
              <>{new Date(row.dateCreated).toLocaleDateString()}</>
              <>{row.endowmentID}</>
              <>{row.bankSummary}</>
              <td className="text-center">
                <Status status={row.status} />
              </td>
              <NavLink
                to={appRoutes.banking_applications + `/${row.wiseRecipientID}`}
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
            nextPageKey ? (
              <td
                colSpan={9}
                key="load-more-btn"
                className="border-t border-blue-l2 rounded-b"
              >
                <LoadMoreBtn
                  onLoadMore={() => onLoadMore(nextPageKey)}
                  disabled={disabled}
                  isLoading={isLoading}
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
      className={`${bg[status]} rounded-sm px-3 py-1 inline-block uppercase text-xs text-white`}
    >
      {text[status]}
    </p>
  );
}
