import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRegistrarContract } from "services/terra/queriers";
import { useEndowmentsQuery } from "services/aws/endowments/endowments";

export type Endowment = {
  address: string;
  description: string;
  icon: string;
  name: string;
  owner: string;
  url: string;
  status: string;
};

// type EndowmentsResult = {
//   Items: Endowment[];
//   Count: number;
//   ScannedCount: number;
// };

export default function useEndowments() {
  const [loading, setLoading] = useState(false);
  // const [endowments, setEndowments] = useState<EndowmentsResult>();
  const { contract: registrar, wallet } = useRegistrarContract();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [walletAddr, setWalletAddr] = useState(wallet?.walletAddress);
  const [endowmentDetails, setEndowmentsDetails] =
    useState<Record<string, Endowment>>();

  const isTest = wallet?.network.name !== "mainnet";
  const { data: endowments, isSuccess, isLoading } = useEndowmentsQuery(isTest); // change to false

  useEffect(() => {
    if (isSuccess !== true || isLoading) return;
    if (loading && walletAddr === wallet?.walletAddress) return;
    fetchEndowments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet, isSuccess, isLoading]);

  async function fetchEndowments() {
    setLoading(true);
    try {
      // const response = await fetch(`${aws_endpoint}/endowments/testnet`);
      const approvals = await registrar.getEndowmentList();
      const detailsMap: Record<string, any> = {};
      endowments?.forEach(
        (endowment) => (detailsMap[endowment.address] = endowment)
      );
      approvals.forEach((data) => {
        detailsMap[data.address] = {
          ...detailsMap[data.address],
          status: data.status,
        };
      });
      setEndowmentsDetails(detailsMap);
      setLoading(false);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return { endowmentDetails, endowments, loading: loading || isLoading };
}
