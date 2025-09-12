import type { INpoUpdate } from "@better-giving/endowment";
import { min_payout_amount } from "@better-giving/endowment/schema";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Field } from "components/form";
import { search } from "helpers/https";
import { endowUpdate } from "pages/admin/endow-update-action";
import { useForm } from "react-hook-form";
import { useFetcher, useNavigate, useSearchParams } from "react-router";
import * as v from "valibot";

interface IContent {
  prev: number;
}

export { ErrorModal as ErrorBoundary } from "components/error";
export const action = endowUpdate({ redirect: ".." });

export const amount = v.pipe(
  v.string(),
  v.transform((x) => +x),
  v.minValue(min_payout_amount, (x) => `minimum is $${x.requirement}`),
  v.transform((x) => x.toString())
);

export default function PayoutMin() {
  const [params] = useSearchParams();
  const { min = min_payout_amount } = search(params);
  const navigate = useNavigate();

  return (
    <Dialog
      open={true}
      onClose={() =>
        navigate("..", { replace: true, preventScrollReset: true })
      }
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30 data-closed:opacity-0" />
      <Content prev={+min} />
    </Dialog>
  );
}

function Content(props: IContent) {
  const fetcher = useFetcher();

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: { amount: props.prev.toString() || "" },
    resolver: valibotResolver(v.object({ amount })),
  });

  return (
    <DialogPanel
      onSubmit={handleSubmit(async ({ amount }) => {
        fetcher.submit({ payout_minimum: +amount } satisfies INpoUpdate, {
          method: "PATCH",
          encType: "application/json",
        });
      })}
      as="form"
      className="fixed-center z-10 grid text-gray-d4 bg-white sm:w-full w-[90vw] sm:max-w-lg rounded-lg p-6"
    >
      <h4 className="mb-2">Payout threshold</h4>

      <Field
        required
        label="Amount"
        placeholder="e.g. $100"
        {...register("amount")}
        error={errors.amount?.message}
        classes="mb-8 mt-4"
      />

      <button
        disabled={fetcher.state !== "idle" || !isDirty}
        className="text-sm btn-blue rounded-full px-4 py-2 font-heading uppercase font-bold"
      >
        {fetcher.state !== "idle" ? "Submitting..." : "Submit"}
      </button>
    </DialogPanel>
  );
}
