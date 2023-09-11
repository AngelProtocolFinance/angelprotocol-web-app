import { useSearchParams } from "react-router-dom";
import { QueryParams, isSuccess } from "./types";
import ErrorPage from "./ErrorPage";
import Success from "./Success";

export default function SignResult({ classes = "" }) {
  const [URLSearchParams] = useSearchParams();

  const params = Array.from(URLSearchParams.entries()).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value }),
    {} as QueryParams
  );

  return (
    <div
      className={
        classes +
        " grid padded-container max-w-lg justify-items-center content-start"
      }
    >
      {isSuccess(params) ? <Success /> : <ErrorPage {...params} />}
    </div>
  );
}
