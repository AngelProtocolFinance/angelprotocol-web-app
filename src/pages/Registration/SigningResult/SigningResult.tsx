import { useSearchParams } from "react-router-dom";
import { QueryParams } from "./types";

export default function SignResult({ classes = "" }) {
  const [URLSearchParams] = useSearchParams();

  const params = Array.from(URLSearchParams.entries()).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value }),
    {} as QueryParams
  );
  //continue registration
  return (
    <div
      className={
        classes + " grid padded-container max-w-lg justify-items-center"
      }
    >
      <h3>Signing successful!</h3>
      <button>continue registration</button>
    </div>
  );
}
