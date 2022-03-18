import { useDonationTransactionsQuery } from "services/aws/endowment_admin/endowment_admin";
import maskAddress from "helpers/maskAddress";
import toCurrency from "helpers/toCurrency";
import useDonor from "./useDonor";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import useSortTransactions, {
  SortDirection,
  SortKey,
} from "./useSortTransactions";
import TableSection from "pages/Admin/components/TableSection";
import { Cells } from "components/TableSection/TableSection";
import React from "react";

const DonationList = (props: { userAddress?: string }) => {
  const { data = [] } = useDonationTransactionsQuery(props.userAddress!, {
    skip: !props.userAddress,
  });

  const showDonor = useDonor();

  const { handleHeaderClick, sortedTransactions, sortDirection, sortKey } =
    useSortTransactions(data);

  return (
    <div className="col-span-2 flex flex-col bg-white bg-opacity-10 p-4 rounded-md shadow-md border border-opacity-10 overflow-auto max-h-75vh">
      <h3 className="text-lg font-bold uppercase flex items-center justify-start text-white">
        Donation History
      </h3>

      <table className="mt-4 w-full">
        <TableSection type="thead" rowClass="">
          <Cells type="th" cellClass="">
            {headers.map((header) => (
              <HeaderButton
                key={header.key}
                onClick={handleHeaderClick(header.key)}
                _activeSortKey={sortKey}
                _sortKey={header.key}
                _sortDirection={sortDirection}
              >
                {header.name}
              </HeaderButton>
            ))}
          </Cells>
        </TableSection>
        <TableSection type="tbody" rowClass="">
          {sortedTransactions.map((tx) => (
            <Cells key={tx.sort_key} type="td" cellClass="">
              <p className="text-base font-bold">$ {toCurrency(tx.amount)}</p>
              <span className="text-base">
                {tx.transaction_date.substring(0, 10)}
              </span>
              <span className="text-base">
                {maskAddress(tx.endowment_address)}
              </span>
              <button
                className="font-heading text-sm text-white-grey bg-blue-accent hover:bg-angel-blue border-2 border-opacity-30 shadow-sm w-32 uppercase text-center pt-1.5 pb-1 mb-1 lg:mb-0 rounded-md disabled:bg-gray-400 disabled:cursor-default"
                onClick={() => showDonor(tx.sort_key)}
              >
                Update
              </button>
            </Cells>
          ))}
        </TableSection>
      </table>
    </div>
  );
};

const headers: { key: SortKey; name: string }[] = [
  { key: "amount", name: "amount" },
  { key: "transaction_date", name: "date" },
  { key: "endowment_address", name: "endowment" },
];

function HeaderButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    _sortDirection: SortDirection;
    _sortKey: SortKey;
    _activeSortKey: SortKey;
  }
) {
  const { _activeSortKey, _sortKey, _sortDirection, children, ...restProps } =
    props;
  return (
    <button {...restProps} className="flex items-center justify-start gap-4">
      <span>{children}</span>
      {_activeSortKey === _sortKey &&
        (_sortDirection === "asc" ? <VscTriangleUp /> : <VscTriangleDown />)}
    </button>
  );
}

export default DonationList;
