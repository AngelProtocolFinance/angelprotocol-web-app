import { useSetModal } from "components/Nodal/Nodal";
import { TableHeader, TableChip } from "components/Table";
import maskAddress from "helpers/maskAddress";
import { useEffect, useState } from "react";
import UpdateEndowmentModal from "./UpdateEndowmentModal";
import { Endowment } from "./useEndowments";

type Props = {
  status: string;
  address: string;
  onClose: Function;
};

const headerNames = ["contract", "Name", "Status", ""];
const FundRow = ({ data }: { data: Endowment }) => {
  const { showModal } = useSetModal();
  const [status, setStatus] = useState("");

  function onUpdateCallback(status: string) {
    status && setStatus(status);
  }

  function openModal() {
    showModal<Props>(UpdateEndowmentModal, {
      status: status || data.status,
      address: data.address,
      onClose: onUpdateCallback,
    });
  }

  return (
    <tr>
      <TableChip data={maskAddress(data.address)} />
      <TableChip data={data.name} />
      <TableChip data={status || data.status || "-"} />
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left text-center">
        <button
          onClick={openModal}
          // disabled={!data.status}
          className="w-32 h-10 rounded-lg px-3 py-1 font-semibold bg-orange disabled:bg-grey-400 shadow-md text-white hover:text-gray-600 font-heading"
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

const DataTable = ({ endowments, endowmentsDetails }: any) => {
  useEffect(() => {
    console.log("render");
  });
  return (
    <table className="min-w-full leading-normal">
      <TableHeader headerNames={headerNames}></TableHeader>
      <tbody>
        {endowments.map(
          (data: any) =>
            endowmentsDetails[data.address] && (
              <FundRow
                key={data.address}
                data={endowmentsDetails[data.address]}
              ></FundRow>
            )
        )}
      </tbody>
    </table>
  );
};
export default DataTable;
