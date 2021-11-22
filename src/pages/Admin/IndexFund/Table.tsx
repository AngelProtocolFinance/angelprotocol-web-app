const FundTableHead = () => {
  return (
    <thead>
      <tr>
        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
          ID
        </th>
        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
          Name
        </th>
        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
          Description
        </th>
        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
          Members
        </th>
      </tr>
    </thead>
  );
};

const FundRow = ({ onUpdateClick, fund }: any) => {
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span className="text-normal font-sans text-center">{fund.id}</span>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
        <p className="text-gray-900 whitespace-no-wrap">{fund.name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
        <p className="text-gray-900 whitespace-no-wrap">{fund.description} </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
        <button
          onClick={onUpdateClick}
          className="w-32 h-10 rounded-lg px-3 py-1 font-semibold bg-orange shadow-md text-white hover:text-gray-600"
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
      <FundTableHead></FundTableHead>
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
