import { Link } from "react-router-dom";
import { useLookupQuery } from "services/endowmentsAPI/endowmentAPI";

export default function Portal({ address }: { address: string }) {
  const { data } = useLookupQuery("");
  const endowmentAddr = data?.[address];
  if (!endowmentAddr) {
    return null;
  } else {
    return <Link to="#">MY ENDOWMENT</Link>;
  }
}
