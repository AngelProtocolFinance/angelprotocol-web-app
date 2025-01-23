import { useSearchParams } from "@remix-run/react";
import ErrorPage from "./ErrorPage";
import Success from "./Success";
import { type QueryParams, isSuccess } from "./types";

export default function SignResult({ classes = "" }) {
  const [URLSearchParams] = useSearchParams();

  const params = Object.fromEntries(URLSearchParams.entries()) as QueryParams;

  return (
    <div
      className={
        classes +
        " grid padded-container max-w-lg justify-items-center content-start"
      }
    >
      {isSuccess(params) ? <Success {...params} /> : <ErrorPage {...params} />}
    </div>
  );
}
