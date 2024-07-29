import { useParams } from "react-router-dom";

export function Fund() {
  const params = useParams();
  return <p>WIP: Fund: {params.id}</p>;
}
