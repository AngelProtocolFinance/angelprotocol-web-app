import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { aws_endpoint } from "constants/urls";

type Endowment = {
  address: string;
  description: string;
  icon: string;
  name: string;
  owner: string;
  url: string;
};

type EndowmentsResult = {
  Items: Endowment[];
  Count: number;
  ScannedCount: number;
};

export default function useEndowments() {
  // const { saveToken } = useSetToken();
  const [loading, setLoading] = useState(false);
  const [endowments, setEndowments] = useState<EndowmentsResult>();

  useEffect(() => {
    console.log("load: ", loading, endowments);
    if (loading || (!loading && endowments)) return;
    fetchEndowments();
  });

  async function fetchEndowments() {
    console.log("called: ", loading, endowments);
    try {
      setLoading(true);
      const response = await fetch(`${aws_endpoint}/endowments`);
      if (response.status === 200) {
        const data: EndowmentsResult = await response.json();
        setEndowments(data);
        return data;
      } else if (response.status === 403) {
        toast.error("Unauthorized");
        return null;
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { endowments, loading };
}
