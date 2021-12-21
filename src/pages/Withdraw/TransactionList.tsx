import { useState } from "react";

const TransactionItemInfo = ({ data: any }: any) => {
  return (
    <tr className="hover:bg-angel-blue text-white bg-opacity-20 border-b-2 border-angel-blue border-opacity-20">
      <td className="p-3">
        <p className="text-base font-bold">$198</p>
        <p className="text-base">One-time</p>
      </td>
      <td>
        <span className="text-base">21 Sept 2021</span>
      </td>
      <td>
        <span className="text-base">a34sfdg5323sef342</span>
      </td>
    </tr>
  );
};

const TransactionList = () => {
  const transactionList = [0, 1, 2];
  const [type, setType] = useState(0);
  return (
    <div className="flex flex-col bg-white bg-opacity-10 p-4 rounded-md shadow-md border border-opacity-10">
      <h3 className="text-lg font-bold uppercase flex items-center justify-start text-white">
        <span>Transaction History</span>
      </h3>
      <table className="mt-4 w-full">
        <thead>
          <tr className="text-md text-left font-heading uppercase text-md border-b-2 border-angel-blue border-opacity-20">
            <th className="text-white text-sm text-left pl-4">Amount/Type</th>
            <th className="text-white text-sm text-left">Date</th>
            <th className="text-white text-sm text-left">Wallet</th>
          </tr>
        </thead>
        <tbody>
          {transactionList.map((item) => (
            <TransactionItemInfo data={item} />
          ))}
        </tbody>
      </table>
      {/*<div className="w-full flex justify-end">
        <button className="action-button">Export as CSV</button>
      </div>*/}
    </div>
  );
};

export default TransactionList;
