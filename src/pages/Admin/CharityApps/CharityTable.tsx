import { FaCheck, FaTimes } from "react-icons/fa";
import { TableHeader, TableChip } from "components/Table";

const headerNames = [
  "Charity Address",
  "Charity Name",
  "Docs",
  "Status",
  "Actions",
];
const TableRow = ({ onUpdateClick, onDeleteClick, charityInfo }: any) => {
  return (
    <tr>
      <TableChip data={charityInfo.TerraWallet} />
      <TableChip data={charityInfo.CharityName} />
      <TableChip data={charityInfo.Docs} type="anchor" />
      <TableChip data={charityInfo.EndowmentStatus} />
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left text-center">
        <button
          onClick={onUpdateClick}
          className="h-10 font-semibold bg-orange shadow-md text-white hover:text-gray-600 font-heading"
          disabled={charityInfo.EndowmentStatus === "Active"}
        >
          <FaCheck className="text-md text-angel-blue" />
        </button>
        <button
          onClick={onDeleteClick}
          className="h-10 font-semibold bg-orange shadow-md text-white hover:text-gray-600 font-heading"
        >
          <FaTimes className="text-md text-red-600" />
        </button>
      </td>
    </tr>
  );
};
const CharityTable = ({ onCheckOut, onDelete, charityList }: any) => {
  return (
    <table className="min-w-full leading-normal">
      <TableHeader headerNames={headerNames}></TableHeader>
      <tbody>
        {charityList?.map((charity: any) => (
          <TableRow
            charity={charity}
            onUpdateClick={onCheckOut}
            onDeleteClick={onDelete}
          ></TableRow>
        ))}
      </tbody>
    </table>
  );
};

export default CharityTable;
