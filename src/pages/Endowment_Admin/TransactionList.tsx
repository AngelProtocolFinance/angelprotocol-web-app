import { useEffect, useState } from "react";
import { useDepositTransactionsQuery } from "services/aws/endowment_admin/endowment_admin";
import maskAddress from "helpers/maskAddress";
import toCurrency from "helpers/toCurrency";
import { EndowmentAddrProps, TransactionItemProps } from "./types";

const TransactionItemInfo = (props: TransactionItemProps) => {
  const data = props.item;

  return (
    <tr className="hover:bg-angel-blue text-white bg-opacity-20 border-b-2 border-angel-blue border-opacity-20">
      <td className="py-2 pl-4">
        <p className="text-base font-bold">$ {toCurrency(data.amount)}</p>
        <p className="text-base capitalize">{data.transaction_type}</p>
      </td>
      <td>
        <span className="text-base">
          {data.transaction_date.substring(0, 10)}
        </span>
      </td>
      <td>
        <span className="text-base">{maskAddress(data.wallet_address)}</span>
      </td>
    </tr>
  );
};

const TransactionItemError = () => {
  return <p className="text-white">No transaction records found.</p>;
};

const TransactionList = (props: EndowmentAddrProps) => {
  const [isError, setIsError] = useState(false);
  const { data } = useDepositTransactionsQuery(props.address);
  useEffect(() => {
    if (data === undefined) {
      setIsError(true);
    }
  }, [isError]);

  return (
    <div className="flex flex-col bg-white bg-opacity-10 p-4 rounded-md shadow-md border border-opacity-10 overflow-auto h-96">
      <h3 className="text-lg font-bold uppercase flex items-center justify-start text-white">
        <span>Transaction History</span>
      </h3>
      {isError && <TransactionItemError />}
      {!isError && (
        <table className="mt-4 w-full">
          <thead>
            <tr className="text-md text-left font-heading uppercase text-md border-b-2 border-angel-blue border-opacity-20">
              <th className="text-white text-sm text-left pl-4">Amount/Type</th>
              <th className="text-white text-sm text-left">Date</th>
              <th className="text-white text-sm text-left">Wallet</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <TransactionItemInfo item={item} />
            ))}
          </tbody>
        </table>
      )}
      {/*<div className="w-full flex justify-end">
        <button className="action-button">Export as CSV</button>
      </div>*/}
    </div>
  );
};

export default TransactionList;
