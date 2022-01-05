import { FaCheck, FaTimes } from "react-icons/fa";
import { TableHeader, TableChip } from "components/Table";
import { app, site } from "types/routes";

const headerNames = [
  "Charity Address",
  "Charity Name",
  "Docs",
  "Status",
  "Actions",
];
const TableRow = ({ onUpdateClick, onDeleteClick, charity }: any) => {
  return (
    <tr>
      <TableChip
        data={charity.TerraWallet}
        link={`${site.app}/${app.charity}/${charity.Endowment || ""}`}
        type="anchor"
      />
      <TableChip data={charity.CharityName} />
      <TableChip data={charity.Docs} link={charity.Docs} type="anchor" />
      <TableChip data={charity.EndowmentStatus === "Active" ? "Approved" : "Pending"} />
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
        <button
          onClick={onUpdateClick}
          className="h-10 font-semibold text-white hover:text-gray-600 font-heading pr-5"
          disabled={charity.EndowmentStatus === "Active"}
        >
          <FaCheck className="text-md text-angel-blue" />
        </button>
        <button
          onClick={onDeleteClick}
          className="h-10 font-semibold text-white hover:text-gray-600 font-heading"
        >
          <FaTimes className="text-md text-red-600" />
        </button>
      </td>
    </tr>
  );
};
const CharityTable = ({ onCheckOut, onDelete, charityList }: any) => {
  return (
    <>
      {charityList?.length === 0 ? (
        <div className="text-center bg-white p-5">no data</div>
      ) : (
        <table className="min-w-full leading-normal">
          <TableHeader headerNames={headerNames}></TableHeader>
          <tbody>
            {charityList?.map((charity: any, index: number) => (
              <TableRow
                key={index}
                charity={charity}
                onUpdateClick={onCheckOut}
                onDeleteClick={onDelete}
              ></TableRow>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default CharityTable;
