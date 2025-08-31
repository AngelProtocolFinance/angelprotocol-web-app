import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Field } from "components/form";
import { ChevronRight, CircleAlert, X } from "lucide-react";
import type { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import {
  Link,
  useFetcher,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router";
import { nonEmpty, object, pipe, string, trim } from "valibot";

function Content() {
  const { verdict } = useParams();
  const [params] = useSearchParams();
  const orgName = params.get("org_name") ?? "";

  const fetcher = useFetcher({ key: "application-review" });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: valibotResolver(
      object({
        reason:
          verdict === "approved"
            ? pipe(string(), trim())
            : pipe(string(), trim(), nonEmpty("required")),
      })
    ),
    defaultValues: { reason: "" },
  });

  return (
    <DialogPanel
      as="form"
      onSubmit={handleSubmit((fv) =>
        fetcher.submit(fv, {
          encType: "application/json",
          method: "POST",
          action: ".",
        })
      )}
      className="fixed-center z-10 grid content-start justify-items-center text-gray-d4 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded-sm overflow-hidden"
    >
      <div className="relative w-full">
        <p className="sm:text-xl font-bold text-center border-b bg-blue-l5 dark:bg-blue-d7 border-gray-l3 p-5">
          Changing Application Status
        </p>
        <Link
          aria-disabled={fetcher.state !== "idle"}
          preventScrollReset
          replace
          to=".."
          className="border border-gray-l3 p-2 rounded-md absolute top-1/2 right-4 transform -translate-y-1/2 disabled:text-gray-l2 dark:disabled:text-gray-d3 dark:disabled:border-gray-d3"
        >
          <X className="text-lg sm:text-2xl" />
        </Link>
      </div>
      <CircleAlert size={80} className="my-6 text-red" />

      <h3 className="text-center text-2xl mb-2 leading-tight px-3 sm:px-8">
        <div className="uppercase">{verdict}</div>
        <div>Nonprofit</div>
      </h3>

      <p className="px-6 pb-4 text-center text-gray dark:text-gray-l2 mt-4">
        <span className="block">
          You are about to {verdict} the Application for
        </span>
        <span className="font-semibold block">{orgName}</span>
      </p>

      {verdict === "approved" ? (
        <div className="px-6 pb-4 text-center text-gray dark:text-gray-l2">
          This will immediately payout all pending funds to newly linked bank
          account and is irreversible.
        </div>
      ) : null}

      <div className="px-6 pb-4 text-center text-gray dark:text-gray-l2 font-bold">
        Please ensure you have confirmed all submitted details and supporting
        documentation before proceeding!
      </div>

      <div className="flex items-center gap-2 mb-6">
        <Status classes="bg-gray-d2">Pending</Status>
        <ChevronRight size={20} />
        {verdict === "approved" ? (
          <Status classes="bg-green">Approved</Status>
        ) : (
          <Status classes="bg-red">Rejected</Status>
        )}
      </div>

      {verdict === "rejected" && (
        <div className="px-6 w-full pb-6">
          <Field
            {...register("reason")}
            error={errors.reason?.message}
            required
            type="textarea"
            label="Reason for rejection:"
          />
        </div>
      )}

      <div className="p-3 sm:px-8 sm:py-4 flex items-center justify-end gap-4 w-full text-center sm:text-right bg-blue-l5 dark:bg-blue-d7 border-t border-gray-l3">
        <Link
          to={".."}
          aria-disabled={fetcher.state === "submitting"}
          type="button"
          className="btn-outline btn text-sm px-8 py-2"
          preventScrollReset
          replace
        >
          Cancel
        </Link>
        <button
          disabled={fetcher.state !== "idle"}
          type="submit"
          className="btn btn-blue px-8 py-2 text-sm"
        >
          Submit
        </button>
      </div>
    </DialogPanel>
  );
}

export default function Prompt() {
  const navigate = useNavigate();
  return (
    <Dialog
      open={true}
      onClose={() =>
        navigate("..", { preventScrollReset: true, replace: true })
      }
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30 data-closed:opacity-0" />
      <Content />
    </Dialog>
  );
}

function Status(props: PropsWithChildren<{ classes?: string }>) {
  return (
    <div
      className={`${
        props.classes ?? ""
      } text-white px-2 py-1 text-xs uppercase rounded`}
    >
      {props.children}
    </div>
  );
}
