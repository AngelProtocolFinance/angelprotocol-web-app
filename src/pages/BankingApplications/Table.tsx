import { TableProps } from "./types";
import { BankingApplicationStatus } from "types/aws";
import { useModalContext } from "contexts/ModalContext";
import ExtLink from "components/ExtLink";
import Icon from "components/Icon";
import TableSection, { Cells } from "components/TableSection";
import LoadMoreBtn from "./LoadMoreBtn";
import Prompt from "./Prompt";

export default function Table({
  applications,
  classes = "",
  disabled,
  isLoading,
  hasMore,
  onLoadMore,
}: TableProps) {
  const { showModal } = useModalContext();
  const review = (verdict: "approve" | "reject", uuid: string) => () => {
    showModal(Prompt, { verdict, uuid });
  };

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
              <>{row.bankName}</>
              <>{row.bankAccountNumber}</>
              <>{row.payoutCurrency}</>
              <td className="text-center">
                <Status status={row.status} />
              </td>
              <ExtLink
                href={row.bankStatementFile.publicUrl}
                className="text-center w-full inline-block hover:text-orange active:text-orange-d1"
              >
                <Icon
                  size={24}
                  type="Folder"
                  title="application details"
                  className="inline-block"
                />
              </ExtLink>
              <div className="flex items-center gap-2">
                <button
                  className="text-green-d1"
                  type="button"
                  onClick={review("approve", row.wiseRecipientID)}
                >
                  <Icon type="CheckCircle" size={18} />
                </button>
                <button
                  className="text-red-d1"
                  type="button"
                  onClick={review("reject", row.wiseRecipientID)}
                >
                  <Icon type="CloseCircle" size={22} />
                </button>
              </div>
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
      className={`${bg[status]} rounded px-3 py-1 inline-block uppercase text-xs text-white`}
    >
      {text[status]}
    </p>
  );
}
