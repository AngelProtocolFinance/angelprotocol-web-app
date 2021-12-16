import { TableHeader, TableChip } from "components/Table";
import maskAddress from "helpers/maskAddress";
import { useEffect, useState } from "react";
import { useRegistrarContract } from "services/terra/hooks";

const headerNames = ["contract", "Name", "Description", ""];
const FundRow = ({ onUpdateClick, data }: any) => {
  const [loading, setLoading] = useState(false);
  const { contract: registrar } = useRegistrarContract();
  const [status, setStatus] = useState("");

  async function getStatus() {
    setLoading(true);
    const result = await registrar.getEndowmentList();
    console.log("result ", result);
    setLoading(false);
  }
  useEffect(() => {
    if (loading || status) return;
    // getStatus();
  });
  return (
    <tr>
      <TableChip data={maskAddress(data.address)} />
      <TableChip data={data.name} />
      <TableChip data={data.status || "-"} />
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left text-center">
        <button
          onClick={onUpdateClick}
          disabled={loading || !status}
          className="w-32 h-10 rounded-lg px-3 py-1 font-semibold bg-orange shadow-md text-white hover:text-gray-600 font-heading"
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

const DataTable = ({ onEditClick, data }: any) => {
  return (
    <table className="min-w-full leading-normal">
      <TableHeader headerNames={headerNames}></TableHeader>
      <tbody>
        {data.map((data: any) => (
          <FundRow
            key={data.address}
            data={data}
            onUpdateClick={onEditClick}
          ></FundRow>
        ))}
      </tbody>
    </table>
  );
};
export default DataTable;
