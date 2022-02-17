// import Action from "components/ActionButton/Action";
// import { useSetModal } from "components/Nodal/Nodal";
// import { TableHeader, TableChip } from "components/Table";
// import maskAddress from "helpers/maskAddress";
// import { useEffect, useState } from "react";
// import UpdateEndowmentModal from "./UpdateEndowmentModal";
// import { Endowment } from "./useEndowments";

// const DataTable = ({ endowments, endowmentsDetails }: any) => {
//   useEffect(() => {
//     console.log("render");
//   });
//   return (
//     <table className="min-w-full leading-normal">
//       <TableHeader headerNames={headerNames}></TableHeader>
//       <tbody>
//         {endowments.map(
//           (data: any) =>
//             endowmentsDetails[data.address] && (
//               <FundRow
//                 key={data.address}
//                 data={endowmentsDetails[data.address]}
//               ></FundRow>
//             )
//         )}
//       </tbody>
//     </table>
//   );
// };
// export default DataTable;

// type Props = {
//   status: string;
//   address: string;
//   onClose: Function;
// };

// const headerNames = ["contract", "Name", "Status", ""];
// const FundRow = ({ data }: { data: Endowment }) => {
//   const { showModal } = useSetModal();
//   const [status, setStatus] = useState("");

//   function onUpdateCallback(status: string) {
//     status && setStatus(status);
//   }

//   function openModal() {
//     showModal<Props>(UpdateEndowmentModal, {
//       status: status || data.status,
//       address: data.address,
//       onClose: onUpdateCallback,
//     });
//   }

//   return (
//     <tr>
//       <TableChip data={maskAddress(data.address)} />
//       <TableChip data={data.name} />
//       <TableChip data={status || data.status || "-"} />
//       <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left text-center">
//         <Action title="Edit" classes="action-button" onClick={openModal} />
//       </td>
//     </tr>
//   );
// };

export const temp = "refactor to use terra types";
