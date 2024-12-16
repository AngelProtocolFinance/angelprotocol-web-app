import { appRoutes } from "constants/routes";
import { regRoutes } from "constants/routes";
import { CircleAlert } from "lucide-react";
import { Link, useFetcher } from "react-router-dom";
import type { ErrorQueryParams } from "./types";

export default function ErrorPage(props: ErrorQueryParams) {
  const fetcher = useFetcher();

  const isRedirecting = fetcher.state === "submitting";
  return (
    <fetcher.Form action="." method="post">
      <div className="bg-red rounded-full aspect-square grid place-items-center mb-4">
        <CircleAlert size={30} className="text-white m-5" />
      </div>
      <h1 className="text-2xl uppercase text-center">Signing failed</h1>
      <p className="bg-blue-l5 dark:bg-blue-d6 p-4 text-sm text-navy-l1 dark:text-navy-l2 mt-4">
        {props.error}: {props.message}
      </p>
      <button
        name="signer_eid"
        value={props.signerEid}
        type="submit"
        disabled={isRedirecting}
        className="w-full max-w-[26.25rem] btn-blue btn-reg mt-6"
      >
        Retry
      </button>
      <Link
        className="w-full max-w-[26.25rem] btn-outline-filled btn-reg mt-4"
        to={`${appRoutes.register}/${regRoutes.resume}`}
        aria-disabled={isRedirecting}
      >
        Back
      </Link>
    </fetcher.Form>
  );
}
