const mockDataList = [
  {
    time: "Nov 28, 2021, 8:59 AM",
    type: "Buy",
    input: "0.1500 WETH",
    output: "5494978.5607 HALO",
    price: "$0.0001",
    wallet: "0xe6e2e2bd4a92c511ab6755ad98a0e1e5d562730c",
  },
  {
    time: "Nov 28, 2021, 8:59 AM",
    type: "Buy",
    input: "0.1500 WETH",
    output: "5494978.5607 HALO",
    price: "$0.0001",
    wallet: "0xe6e2e2bd4a92c511ab6755ad98a0e1e5d562730c",
  },
  {
    time: "Nov 28, 2021, 8:59 AM",
    type: "Buy",
    input: "0.1500 WETH",
    output: "5494978.5607 HALO",
    price: "$0.0001",
    wallet: "0xe6e2e2bd4a92c511ab6755ad98a0e1e5d562730c",
  },
  {
    time: "Nov 28, 2021, 8:59 AM",
    type: "Buy",
    input: "0.1500 WETH",
    output: "5494978.5607 HALO",
    price: "$0.0001",
    wallet: "0xe6e2e2bd4a92c511ab6755ad98a0e1e5d562730c",
  },
  {
    time: "Nov 28, 2021, 8:59 AM",
    type: "Buy",
    input: "0.1500 WETH",
    output: "5494978.5607 HALO",
    price: "$0.0001",
    wallet: "0xe6e2e2bd4a92c511ab6755ad98a0e1e5d562730c",
  },
  {
    time: "Nov 28, 2021, 8:59 AM",
    type: "Buy",
    input: "0.1500 WETH",
    output: "5494978.5607 HALO",
    price: "$0.0001",
    wallet: "0xe6e2e2bd4a92c511ab6755ad98a0e1e5d562730c",
  },
  {
    time: "Nov 28, 2021, 8:59 AM",
    type: "Buy",
    input: "0.1500 WETH",
    output: "5494978.5607 HALO",
    price: "$0.0001",
    wallet: "0xe6e2e2bd4a92c511ab6755ad98a0e1e5d562730c",
  },
  {
    time: "Nov 28, 2021, 8:59 AM",
    type: "Buy",
    input: "0.1500 WETH",
    output: "5494978.5607 HALO",
    price: "$0.0001",
    wallet: "0xe6e2e2bd4a92c511ab6755ad98a0e1e5d562730c",
  },
  {
    time: "Nov 28, 2021, 8:59 AM",
    type: "Buy",
    input: "0.1500 WETH",
    output: "5494978.5607 HALO",
    price: "$0.0001",
    wallet: "0xe6e2e2bd4a92c511ab6755ad98a0e1e5d562730c",
  },
  {
    time: "Nov 28, 2021, 8:59 AM",
    type: "Buy",
    input: "0.1500 WETH",
    output: "5494978.5607 HALO",
    price: "$0.0001",
    wallet: "0xe6e2e2bd4a92c511ab6755ad98a0e1e5d562730c",
  },
  {
    time: "Nov 28, 2021, 8:59 AM",
    type: "Buy",
    input: "0.1500 WETH",
    output: "5494978.5607 HALO",
    price: "$0.0001",
    wallet: "0xe6e2e2bd4a92c511ab6755ad98a0e1e5d562730c",
  },
  {
    time: "Nov 28, 2021, 8:59 AM",
    type: "Buy",
    input: "0.1500 WETH",
    output: "5494978.5607 HALO",
    price: "$0.0001",
    wallet: "0xe6e2e2bd4a92c511ab6755ad98a0e1e5d562730c",
  },
  {
    time: "Nov 28, 2021, 8:59 AM",
    type: "Buy",
    input: "0.1500 WETH",
    output: "5494978.5607 HALO",
    price: "$0.0001",
    wallet: "0xe6e2e2bd4a92c511ab6755ad98a0e1e5d562730c",
  },
  {
    time: "Nov 28, 2021, 8:59 AM",
    type: "Buy",
    input: "0.1500 WETH",
    output: "5494978.5607 HALO",
    price: "$0.0001",
    wallet: "0xe6e2e2bd4a92c511ab6755ad98a0e1e5d562730c",
  },
];
const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
          Time
        </th>
        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
          Type
        </th>
        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
          Input
        </th>
        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
          output
        </th>
        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
          Halo Price
        </th>
        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
          wallet
        </th>
      </tr>
    </thead>
  );
};
const TableRow = ({ data }: any) => {
  return (
    <tr style={{ minWidth: "600px", maxHeight: "600px" }}>
      <td className="px-5 py-5 border-b border-gray-200 bg-transparent text-white-grey text-sm">
        <span className="text-normal font-sans text-center">{data.time}</span>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 text-sm text-left">
        <p className="whitespace-no-wrap">{data.type}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 text-sm text-left">
        <p className="whitespace-no-wrap">{data.input} </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 text-sm text-left">
        <p className="whitespace-no-wrap">{data.output} </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 text-sm text-left">
        <p className="whitespace-no-wrap">{data.price} </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 text-sm text-left">
        <p className="whitespace-no-wrap">{data.wallet} </p>
      </td>
      {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
        <button
          onClick={onUpdateClick}
          className="w-32 h-10 rounded-lg px-3 py-1 font-semibold bg-orange shadow-md text-white hover:text-gray-600"
        >
          Edit
        </button>
      </td> */}
    </tr>
  );
};
export default function AuctionHistory() {
  return (
    <table className="w-full min-w-136 leading-normal overflow-x-scroll whitespace-nowrap">
      <TableHeader></TableHeader>
      <tbody className="max-h-1/2 overflow-y-scroll">
        {mockDataList.map((row: any) => (
          <TableRow data={row}></TableRow>
        ))}
      </tbody>
    </table>
  );
}
