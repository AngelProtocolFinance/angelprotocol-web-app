import { Link } from "react-router-dom";
import { useLookupQuery } from "services/endowmentsAPI/endowmentAPI";

export default function Portal({ address }: { address: string }) {
  const { data } = useLookupQuery("");
  const endowmentAddr = data?.[address];
  if (!endowmentAddr) {
    return null;
  } else {
    return (
      <Link
        onClick={() => {
          alert(`go to charity address | ${endowmentAddr} |`);
        }}
        to="#"
        className="ml-4 mr-auto bg-blue-accent hover:bg-angel-blue active:bg-angel-blue text-sm text-white-grey rounded-sm py-1 px-2 mt-2"
      >
        MY ENDOWMENT
      </Link>
    );
  }
}
