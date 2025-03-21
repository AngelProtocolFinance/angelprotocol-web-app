import { Link, useFetcher } from "@remix-run/react";
import { appRoutes } from "constants/routes";
import { regRoutes } from "constants/routes";
import { CircleAlert } from "lucide-react";
import type { ErrorQueryParams } from "./types";

export default function ErrorPage(props: ErrorQueryParams) {
  const fetcher = useFetcher();

  const isRedirecting = fetcher.state === "submitting";
  return (
    <fetcher.Form method="POST">
      <div className="bg-red rounded-full aspect-square grid place-items-center mb-4">
        <CircleAlert size={30} className="text-white m-5" />
      </div>
      <h1 className="text-2xl uppercase text-center">Signing failed</h1>
      <p className="bg-blue-l5 dark:bg-blue-d6 p-4 text-sm text-gray dark:text-gray mt-4">
        {props.error}: {props.message}
      </p>
      <button
        name="signer_eid"
        value={props.signerEid}
        type="submit"
        disabled={isRedirecting}
        className="w-full max-w-[26.25rem] btn btn-blue text-sm mt-6"
      >
        Retry
      </button>
      <Link
        className="w-full max-w-[26.25rem] btn-outline btn text-sm mt-4"
        to={`${appRoutes.register}/${regRoutes.resume}`}
        aria-disabled={isRedirecting}
      >
        Back
      </Link>
    </fetcher.Form>
  );
}
