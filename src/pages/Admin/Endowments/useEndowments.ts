// import { useConnectedWallet } from "@terra-money/use-wallet";
// import Registrar from "contracts/Registrar";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";

// export default function useEndowments() {
//   const wallet = useConnectedWallet();
//   const [loading, setLoading] = useState(false);
//   // const [endowments, setEndowments] = useState<EndowmentsResult>();
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [walletAddr] = useState(wallet?.walletAddress);
//   const [endowmentDetails, setEndowmentsDetails] =
//     useState<Record<string, Endowment>>();

//   const isTest = wallet?.network.name !== "mainnet";

//   useEffect(() => {
//     if (isSuccess !== true || isLoading) return;
//     if (loading && walletAddr === wallet?.walletAddress) return;
//     fetchEndowments();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [wallet, isSuccess, isLoading]);

//   async function fetchEndowments() {
//     setLoading(true);
//     try {
//       // const response = await fetch(`${aws_endpoint}/endowments/testnet`);
//       const contract = new Registrar(wallet);
//       const approvals = await contract.getEndowmentList();
//       const detailsMap: Record<string, any> = {};
//       endowments?.forEach(
//         (endowment) => (detailsMap[endowment.address] = endowment)
//       );
//       approvals.forEach((data) => {
//         detailsMap[data.address] = {
//           ...detailsMap[data.address],
//           status: data.status,
//         };
//       });
//       setEndowmentsDetails(detailsMap);
//       setLoading(false);
//     } catch (error) {
//       toast.error("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return { endowmentDetails, endowments, loading: loading || isLoading };
// }

//TODO: refactor this to use RTK
export const temp = "";
