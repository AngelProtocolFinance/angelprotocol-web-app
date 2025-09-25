import type { IReg, TStatus } from "@better-giving/reg";
import { HeaderButton } from "components/header-button";
import { Cells, TableSection } from "components/table-section";
import { appRoutes } from "constants/routes";
import { toPP } from "helpers/date";
import { use_sort } from "hooks/use-sort";
import { Folder } from "lucide-react";
import { NavLink } from "react-router";
import type { IPaginator } from "types/components";
import LoadMoreBtn from "./load-more-btn";

interface Props extends IPaginator<IReg> {}

export function Table({
  items,
  classes = "",
  disabled,
  loading,
  load_next,
}: Props) {
  const { handleHeaderClick, sorted, sortDirection, sortKey } = use_sort(
    items,
    "updated_at"
  );

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
          <td className="w-4">type</td>
          <HeaderButton
            onClick={handleHeaderClick("o_name")}
            _activeSortKey={sortKey}
            _sortKey="OrganizationName"
            _sortDirection={sortDirection}
          >
            Nonprofit Name
          </HeaderButton>
          <HeaderButton
            onClick={handleHeaderClick("updated_at")}
            _activeSortKey={sortKey}
            _sortKey="RegistrationDate"
            _sortDirection={sortDirection}
          >
            Date Submitted
          </HeaderButton>
          <HeaderButton
            onClick={handleHeaderClick("o_hq_country")}
            _activeSortKey={sortKey}
            _sortKey="HqCountry"
            _sortDirection={sortDirection}
          >
            HQ Country
          </HeaderButton>
          <HeaderButton
            style={{ justifyContent: "center" }}
            onClick={handleHeaderClick("status")}
            _activeSortKey={sortKey}
            _sortKey="RegistrationStatus"
            _sortDirection={sortDirection}
            className="w-full"
          >
            Registration Status
          </HeaderButton>
          <span className="flex justify-center">Details</span>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="even:bg-blue-l5 dark:odd:bg-blue-d6 dark:even:bg-blue-d7 divide-x divide-blue-l2"
        selectedClass="bg-blue-l4 dark:bg-blue-d4"
      >
        {sorted
          .map((row) => (
            <Cells
              key={row.id}
              type="td"
              cellClass={`p-3 border-t border-blue-l2 max-w-[256px] truncate ${
                load_next ? "" : "first:rounded-bl last:rounded-br"
              }`}
            >
              <span className="text-xs font-bold upppercase">
                {row.claim ? "Claim" : "New"}
              </span>
              <>{row.o_name}</>
              <>{toPP(row.updated_at)}</>
              <>{row.o_hq_country}</>
              <td className="text-center">
                <Status status={row.status} />
              </td>
              <NavLink
                to={appRoutes.applications + `/${row.id}`}
                className="text-center w-full inline-block [&:is(.pending)]:text-gray hover:text-blue-d1"
              >
                <Folder
                  size={22}
                  aria-label="application details"
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
  "03": "bg-green",
  "02": "bg-gray-d1",
  "04": "bg-red",
  "01": "bg-gray-d1",
};

const text: { [key in TStatus]: string } = {
  "03": "Approved",
  "02": "Pending",
  "04": "Rejected",
  "01": "Incomplete",
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
