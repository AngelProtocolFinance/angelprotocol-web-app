import { useDepositTransactionsQuery } from "services/aws/endowment_admin/endowment_admin";
import maskAddress from "helpers/maskAddress";
import toCurrency from "helpers/toCurrency";
import TableSection, { Cells } from "components/TableSection/TableSection";
import { Transaction } from "services/aws/endowment_admin/types";

const TransactionList = (props: { endowmentAddress: string }) => {
  const {
    data = [],
    isLoading,
    isFetching,
    isError,
  } = useDepositTransactionsQuery(props.endowmentAddress);

  return (
    <div className="col-span-2 flex flex-col bg-white bg-opacity-10 p-4 rounded-md shadow-md shadow-inner overflow-auto h-process">
      <h3 className="text-lg font-bold uppercase flex items-center justify-start text-white">
        Transaction History
      </h3>
      <TransactionsTable transactions={data} />
    </div>
  );
};

function TransactionsTable(props: { transactions: Transaction[] }) {
  return (
    <table className="mt-4 w-full">
      <TableSection type="thead" rowClass="">
        <Cells type="th" cellClass="text-white text-sm text-left">
          <>Type</>
          <>Amount</>
          <>Date</>
          <>Wallet</>
        </Cells>
      </TableSection>
      <TableSection type="tbody" rowClass="">
        {props.transactions.map((tx) => (
          <Cells type="td" cellClass="" key={tx.sort_key}>
            <p className="text-base font-bold">$ {toCurrency(tx.amount)}</p>
            <p className="text-base capitalize">{tx.transaction_type}</p>
            <span className="text-base">
              {tx.transaction_date.substring(0, 10)}
            </span>
            <span className="font-mono">{maskAddress(tx.wallet_address)}</span>
          </Cells>
        ))}
      </TableSection>
    </table>
  );
}

export default TransactionList;
