import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { aws_endpoint } from "constants/urls";
import { useRegistrarContract } from "services/terra/hooks";

export type Endowment = {
  address: string;
  description: string;
  icon: string;
  name: string;
  owner: string;
  url: string;
  status: string;
};

type EndowmentsResult = {
  Items: Endowment[];
  Count: number;
  ScannedCount: number;
};

export default function useEndowments() {
  console.log("new hook");
  // const { saveToken } = useSetToken();
  const [loading, setLoading] = useState(false);
  const [endowments, setEndowments] = useState<EndowmentsResult>();
  const { contract: registrar } = useRegistrarContract();
  const [endowmentDetails, setEndowmentsDetails] =
    useState<Record<string, Endowment>>();

  useEffect(() => {
    if (loading) return;
    fetchEndowments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchEndowments() {
    setLoading(true);
    try {
      const response = await fetch(`${aws_endpoint}/endowments`);
      const approvals = await registrar.getEndowmentList();

      if (response.status === 200) {
        const data: EndowmentsResult = await response.json();
        const detailsMap: Record<string, any> = {};

        data.Items.forEach(
          (endowment) => (detailsMap[endowment.address] = endowment)
        );
        approvals.forEach((data) => {
          detailsMap[data.address] = {
            ...detailsMap[data.address],
            status: data.status,
          };
        });

        setEndowmentsDetails(detailsMap);
        setEndowments(data);
        setLoading(false);
      } else if (response.status === 403) {
        toast.error("Unauthorized");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return { endowmentDetails, endowments, loading };
}
