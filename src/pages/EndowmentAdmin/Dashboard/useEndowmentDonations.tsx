import { useEffect, useState } from "react";
import { flipside_endpoint } from "constants/urls";

export default function useEndowmentDonations(endownmentAddr: string) {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    setLoading(true);
    const response = await fetch(`${flipside_endpoint}${endownmentAddr}`, {
      method: "get",
    });
    if (response.status === 200 && response.ok) {
      setData(await response.json());
    }
  };

  useEffect(() => {
    if (!endownmentAddr || isLoading) return;
    fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endownmentAddr]);

  return { data, isLoading };
}
