import { Transaction } from "types/axelar";
import ExtLink from "components/ExtLink";
import LoaderRing from "components/LoaderRing";
import TableSection, { Cells } from "components/TableSection";
import { humanize } from "helpers";
import { IS_TEST } from "constant/env";

type Props = {
  txs: Transaction[];
  classes?: string;
  onLoadMore(): void;
  hasMore: boolean;
  disabled: boolean;
  isLoading: boolean;
};

export default function Table({
  txs,
  classes = "",
  disabled,
  isLoading,
  hasMore,
  onLoadMore,
}: Props) {
  return (
    <table
      className={`${classes} w-full text-sm rounded border border-separate border-spacing-0 border-gray-l3 dark:border-bluegray`}
    >
      <TableSection
        type="thead"
        rowClass="bg-orange-l6 dark:bg-blue-d7 divide-x divide-prim"
      >
        <Cells
          type="th"
          cellClass="px-3 py-4 text-xs uppercase font-semibold text-left first:rounded-tl last:rounded-tr"
        >
          <>Status</>
          <>Token</>
          <>Amount</>
          <>Hash</>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="even:bg-orange-l6 dark:odd:bg-blue-d6 dark:even:bg-blue-d7 divide-x divide-prim"
        selectedClass="bg-orange-l5 dark:bg-blue-d4"
      >
        {txs
          .map((tx) => (
            <Cells
              key={tx.call.transactionHash}
              type="td"
              cellClass={`p-3 border-t border-gray-l3 dark:border-bluegray max-w-[256px] truncate ${
                hasMore ? "" : "first:rounded-bl last:rounded-br"
              }`}
            >
              <>{tx.status}</>
              <>{tx.symbol}</>
              <>{humanize(tx.amount, 4)}</>
              <ExtLink
                href={`${
                  IS_TEST
                    ? "https://testnet.axelarscan.io/gmp"
                    : "https://axelarscan.io/gmp"
                }/${tx.call.transactionHash}`}
                className="cursor-pointer text-sm hover:underline"
              >
                {tx.call.transactionHash}
              </ExtLink>
            </Cells>
          ))
          .concat(
            hasMore ? (
              <td
                colSpan={9}
                key="load-more-btn"
                className="border-t border-gray-l3 dark:border-bluegray rounded-b"
              >
                <button
                  type="button"
                  onClick={onLoadMore}
                  disabled={disabled}
                  className="flex items-center justify-center gap-3 uppercase text-sm font-bold rounded-b w-full h-12 hover:bg-orange-l5 dark:hover:bg-blue-d3 active:bg-orange-l4 dark:active:bg-blue-d2 disabled:bg-gray-l3 disabled:text-gray aria-disabled:bg-gray-l3 aria-disabled:dark:bg-bluegray disabled:dark:bg-bluegray"
                >
                  {isLoading ? (
                    <>
                      <LoaderRing thickness={10} classes="w-6" /> Loading...
                    </>
                  ) : (
                    "Load More"
                  )}
                </button>
              </td>
            ) : (
              []
            )
          )}
      </TableSection>
    </table>
  );
}
