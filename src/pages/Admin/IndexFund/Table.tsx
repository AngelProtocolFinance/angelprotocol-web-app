import { TableHeader, TableChip } from "components/Table";

const headerNames = ["ID", "Name", "Description", "Members"];

const FundRow = ({ onUpdateClick, fund }: any) => {
  return (
    <tr>
      <TableChip data={fund.id} />
      <TableChip data={fund.name} />
      <TableChip data={fund.description} />
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left text-center">
        <button
          onClick={onUpdateClick}
          className="w-32 h-10 rounded-lg px-3 py-1 font-semibold bg-orange shadow-md text-white hover:text-gray-600 font-heading"
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

const IndexFundTable = ({ onEditClick }: any) => {
  return (
    <table className="min-w-full leading-normal">
      <TableHeader headerNames={headerNames}></TableHeader>
      <tbody>
        {mockDataList.map((fund: any) => (
          <FundRow fund={fund} onUpdateClick={onEditClick}></FundRow>
        ))}
      </tbody>
    </table>
  );
};

const mockDataList = [
  {
    id: 1,
    name: "Animal welfare fund",
    description: "Doctors without Borders",
  },
  {
    id: 1,
    name: "Sugar welfare fund",
    description: "Doctors along Borders",
  },
  {
    id: 1,
    name: "Sicklers welfare fund",
    description: "Doctors with Borders",
  },
];

export default IndexFundTable;
