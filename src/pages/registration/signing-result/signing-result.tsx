import { useSearchParams } from "react-router";
import ErrorPage from "./error-page";
import Success from "./success";
import { type QueryParams, isSuccess } from "./types";

export default function SignResult({ classes = "" }) {
  const [URLSearchParams] = useSearchParams();

  const params = Object.fromEntries(URLSearchParams.entries()) as QueryParams;

  return (
    <div
      className={
        classes + " grid px-5 max-w-lg justify-items-center content-start"
      }
    >
      {isSuccess(params) ? <Success {...params} /> : <ErrorPage {...params} />}
    </div>
  );
}
