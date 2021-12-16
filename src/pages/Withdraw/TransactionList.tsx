import { useState } from "react";

const TransactionItemInfo = ({ data: any }: any) => {
  return (
    <tr className="h-20 hover:bg-green-100">
      <td className="pl-4">
        <p className="text-base font-bold">$198</p>
        <p className="text-gray-400 text-base">One-time</p>
      </td>
      <td>
        <span className="text-gray-400 text-base">21 Sept 2021</span>
      </td>
      <td>
        <span className="text-gray-400 text-base">a34sfdg5323sef342</span>
      </td>
    </tr>
  );
};

const TransactionList = () => {
  const transactionList = [0, 1, 2];
  const [type, setType] = useState(0);
  return (
    <div className="md:mx-6 bg-white rounded-3xl p-6">
      <div className="md:text-lg text-md font-bold uppercase">
        <button
          className={
            type == 0
              ? "mr-4 text-lg font-bold uppercase text-angel-blue"
              : "mr-4 text-lg font-bold uppercase text-gray-200"
          }
          onClick={() => setType(0)}
        >
          Transaction history
        </button>
        <button
          className={
            type == 1
              ? "mr-4 text-lg font-bold uppercase text-angel-blue"
              : "mr-4 text-lg font-bold uppercase text-gray-200"
          }
          onClick={() => setType(1)}
        >
          Account balances
        </button>
      </div>
      <table className="border-collapse table-auto w-fill md:mx-6 my-10">
        <thead>
          <tr>
            <th className="text-gray-400 text-sm text-left pl-4">
              Amount/Type
            </th>
            <th className="text-gray-400 text-sm text-left">Date</th>
            <th className="text-gray-400 text-sm text-left">wallet</th>
          </tr>
        </thead>
        <tbody className="overflow-y-scroll divide-y divide-gray-200">
          {transactionList.map((item) => (
            <TransactionItemInfo data={item} />
          ))}
        </tbody>
      </table>
      <button className="hover:bg-blue-accent bg-angel-blue rounded-lg w-56 h-12 text-sm font-bold text-white">
        Export as CSV
      </button>
    </div>
  );
};

export default TransactionList;
