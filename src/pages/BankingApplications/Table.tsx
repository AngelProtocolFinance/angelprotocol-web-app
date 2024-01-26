import Icon from "components/Icon";
import TableSection, { Cells } from "components/TableSection";
import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import { BankingApplicationStatus } from "types/aws";
import LoadMoreBtn from "./LoadMoreBtn";
import { TableProps } from "./types";

export default function Table({
  applications,
  classes = "",
  disabled,
  isLoading,
  hasMore,
  onLoadMore,
}: TableProps) {
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
          <>Account</>
          <th className="text-center">Status</th>
          <th className="text-center">Details</th>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="even:bg-orange-l6 dark:odd:bg-blue-d6 dark:even:bg-blue-d7 divide-x divide-prim"
        selectedClass="bg-orange-l5 dark:bg-blue-d4"
      >
        {applications
          .map((row) => (
            <Cells
              key={row.wiseRecipientID}
              type="td"
              cellClass={`p-3 border-t border-prim max-w-[256px] truncate ${
                hasMore ? "" : "first:rounded-bl last:rounded-br"
              }`}
            >
              <>{new Date(row.dateCreated).toLocaleDateString()}</>
              <>{row.endowmentID}</>
              <>{row.bankSummary}</>
              <td className="text-center">
                <Status status={row.status} />
              </td>
              <Link
                to={appRoutes.banking_applications + `/${row.wiseRecipientID}`}
                className="text-center w-full inline-block hover:text-orange active:text-orange-d1"
              >
                <Icon
                  size={24}
                  type="Folder"
                  title="bank statement file"
                  className="inline-block"
                />
              </Link>
            </Cells>
          ))
          .concat(
            hasMore ? (
              <td
                colSpan={9}
                key="load-more-btn"
                className="border-t border-prim rounded-b"
              >
                <LoadMoreBtn
                  onLoadMore={onLoadMore}
                  disabled={disabled}
                  isLoading={isLoading}
                />
              </td>
            ) : (
              []
            ),
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
      className={`${bg[status]} rounded px-3 py-1 inline-block uppercase text-xs text-white`}
    >
      {text[status]}
    </p>
  );
}
