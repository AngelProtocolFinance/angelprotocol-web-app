import { useParams } from "react-router-dom";

export function Component() {
  const params = useParams();
  return <p>WIP: Fund: {params.fundId}</p>;
}
