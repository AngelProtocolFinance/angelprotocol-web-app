import { Cells, TableSection } from "components/table-section";
import { Arrow, Content, Tooltip } from "components/tooltip";
import { APP_NAME } from "constants/env";
import { InfoIcon, SparklesIcon } from "lucide-react";
import type { IPaginator } from "types/components";
import type { IRow } from "./helpers";
import { Row } from "./row";

interface Props extends IPaginator<IRow> {}

export function Table({ items, load_next, loading, disabled }: Props) {
  return (
    <table className="w-full text-sm rounded-sm border border-separate border-spacing-0 border-gray-l3">
      <TableSection
        type="thead"
        rowClass="bg-blue-l4 dark:bg-blue-d7 divide-x divide-gray-l3"
      >
        <Cells
          type="th"
          cellClass="px-3 py-4 text-xs uppercase  font-medium text-left first:rounded-tl last:rounded-tr"
        >
          <>Date</>
          <>Program</>
          <>Origin</>
          <>Method</>
          <>Amount</>
          <th>
            <div className="flex items-center gap-x-1">
              <span>Fees </span>
              <Tooltip
                tip={
                  <Content className="p-4 bg-white max-w-sm text-sm rounded-lg shadow-lg">
                    <p className="text-xs uppercase  font-medium">
                      Base fee{" "}
                      <span className="text-blue text-xs font-semibold">
                        1.5%
                      </span>
                    </p>
                    <p className="text-gray-d1 mb-4">
                      charged when {APP_NAME} tip screen is disabled at the time
                      of donation
                    </p>
                    <p className="text-xs uppercase  font-medium">
                      Fiscal sponsorship fee{" "}
                      <span className="text-blue text-xs font-semibold">
                        2.9%
                      </span>
                    </p>
                    <p className="text-xs uppercase  font-medium mt-4">
                      Processing fee
                    </p>
                    <p className="text-gray-d1">
                      charged by payment processor (Stripe, Chariot, etc.)
                    </p>
                    <p className="text-gray-d1">
                      covered by donor
                      <SparklesIcon
                        className="fill-green stroke-green ml-1 inline"
                        size={13}
                      />
                    </p>
                    <Arrow className="fill-white" />
                  </Content>
                }
              >
                <InfoIcon size={14} className="text-gray" />
              </Tooltip>
            </div>
          </th>
          <>Net</>
          <>Allocation</>
          <>Donor</>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="even:bg-blue-l5 dark:odd:bg-blue-d6 dark:even:bg-blue-d7 divide-x divide-blue-l2"
        selectedClass="bg-blue-l4 dark:bg-blue-d4"
      >
        {items
          .map((record) => (
            <Row
              key={record.id}
              {...record}
              classes={load_next ? "" : "first:rounded-bl last:rounded-br"}
            />
          ))
          .concat(
            load_next ? (
              <td
                colSpan={19}
                key="load-more-btn"
                className="border-t border-gray-l3 rounded-b"
              >
                <button
                  type="button"
                  onClick={load_next}
                  disabled={disabled}
                  className="flex items-center justify-center gap-3 uppercase text-sm font-semibold rounded-b w-full h-12 enabled:hover:bg-blue-l4 dark:enabled:hover:bg-blue-d3 active:bg-blue-l4 dark:active:bg-blue-d2 disabled:bg-gray-l3 disabled:text-gray aria-disabled:bg-gray-l3 dark:aria-disabled:bg-gray-d1 dark:disabled:bg-gray-d1"
                >
                  {loading ? "Loading..." : "Load More"}
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
