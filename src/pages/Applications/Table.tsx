import {
  type Status as TStatus,
  isIrs501c3,
} from "@better-giving/registration/models";
import { HeaderButton } from "components/HeaderButton";
import TableSection, { Cells } from "components/TableSection";
import { appRoutes } from "constants/routes";
import useSort from "hooks/useSort";
import { Folder } from "lucide-react";
import { Link } from "react-router-dom";
import LoadMoreBtn from "./LoadMoreBtn";
import type { TableProps } from "./types";

export default function Table({
  applications,
  classes = "",
  disabled,
  isLoading,
  hasMore,
  onLoadMore,
}: TableProps) {
  const { handleHeaderClick, sorted, sortDirection, sortKey } = useSort(
    applications,
    "updated_at"
  );

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
          <td className="w-4">type</td>
          <HeaderButton
            onClick={handleHeaderClick("org_name")}
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
            onClick={handleHeaderClick("hq_country")}
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
                hasMore ? "" : "first:rounded-bl last:rounded-br"
              }`}
            >
              <span className="text-xs font-bold upppercase">
                {isIrs501c3(row.docs) && row.docs.claim ? "Claim" : "New"}
              </span>
              <>{row.org_name}</>
              <>{new Date(row.updated_at).toLocaleDateString()}</>
              <>{row.hq_country}</>
              <td className="text-center">
                <Status status={row.status} />
              </td>
              <Link
                to={appRoutes.applications + `/${row.id}`}
                className="text-center w-full inline-block hover:text-blue-d1"
              >
                <Folder
                  size={22}
                  aria-label="application details"
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
                className="border-t border-blue-l2 rounded-b"
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
      className={`${bg[status]} rounded px-3 py-1 inline-block uppercase text-xs text-white`}
    >
      {text[status]}
    </p>
  );
}
