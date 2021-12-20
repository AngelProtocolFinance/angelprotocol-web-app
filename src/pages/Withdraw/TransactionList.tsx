import { useState } from "react";

const TransactionItemInfo = ({ data: any }: any) => {
  return (
    <tr className="h-20 hover:bg-angel-blue text-white">
      <td className="pl-4">
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
    <div className="bg-white bg-opacity-10 rounded-md p-6 shadow-md border border-opacity-10 w-full">
      <div className="md:text-lg text-md font-bold uppercase">
        <button
          className={
            type === 0
              ? "mr-4 text-lg font-bold uppercase text-angel-blue"
              : "mr-4 text-lg font-bold uppercase text-gray-200"
          }
          onClick={() => setType(0)}
        >
          Transaction history
        </button>
        {/* <button
          className={
            type == 1
              ? "mr-4 text-lg font-bold uppercase text-angel-blue"
              : "mr-4 text-lg font-bold uppercase text-gray-200"
          }
          onClick={() => setType(1)}
        >
          Account balances
        </button> */}
      </div>
      <table className="border-collapse table-auto w-fill md:mx-6 my-10">
        <thead>
          <tr>
            <th className="text-white text-sm text-left pl-4">Amount/Type</th>
            <th className="text-white text-sm text-left">Date</th>
            <th className="text-white text-sm text-left">Wallet</th>
          </tr>
        </thead>
        <tbody className="overflow-y-scroll divide-y divide-gray-200">
          {transactionList.map((item) => (
            <TransactionItemInfo data={item} />
          ))}
        </tbody>
      </table>
      <div className="w-full flex justify-end">
        <button className="action-button">Export as CSV</button>
      </div>
    </div>
  );
};

export default TransactionList;
