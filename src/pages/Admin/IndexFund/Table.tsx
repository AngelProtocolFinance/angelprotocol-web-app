import Action from "components/ActionButton/Action";
import { TableHeader, TableChip } from "components/Table";

const headerNames = ["ID", "Name", "Description", "Members"];
const FundRow = ({ onUpdateClick, fund }: any) => {
  return (
    <tr>
      <TableChip data={fund.id} />
      <TableChip data={fund.name} />
      <TableChip data={fund.description} />
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left text-center">
        <Action title="Edit" classes="action-button" onClick={onUpdateClick} />
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
