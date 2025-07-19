import type { EndowUpdate } from "@better-giving/endowment";
import { min_payout_amount } from "@better-giving/endowment/schema";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Field,
  Input,
  Label,
} from "@headlessui/react";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useFetcher, useNavigate, useSearchParams } from "@remix-run/react";
import { endowUpdate } from "pages/admin/endow-update-action";
import { useForm } from "react-hook-form";
import * as v from "valibot";

interface IContent {
  prev: number;
}

export { ErrorModal as ErrorBoundary } from "components/error";
export const action = endowUpdate({ redirect: "." });

export const amount = v.pipe(
  v.string(),
  v.transform((x) => +x),
  v.minValue(0, "amount must be greater than 0"),
  v.transform((x) => x.toString())
);

export default function Form() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const min = +(params.get("min") ?? `${min_payout_amount}`);

  return (
    <Dialog
      open={true}
      onClose={() =>
        navigate("..", { replace: true, preventScrollReset: true })
      }
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30 data-closed:opacity-0" />
      <Content prev={min} />
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
        fetcher.submit({ payout_minimum: +amount } satisfies EndowUpdate, {
          encType: "application/json",
        });
      })}
      as="form"
      className="fixed-center z-10 grid text-gray-d4 bg-white sm:w-full w-[90vw] sm:max-w-lg rounded-lg p-6"
    >
      <h4 className="mb-2">Payout threshold</h4>

      <Field className="grid my-4">
        <Label className="font-semibold mb-1">
          Amount
          <span className="text-red"> *</span>
        </Label>
        <Input
          placeholder="e.g. $ 100"
          {...register("amount")}
          className="px-4 py-3 rounded-lg outline-blue-d1 border border-gray-l3 font-heading"
        />
        <span className="text-red text-xs text-right empty:hidden mt-1">
          {errors.amount?.message}
        </span>
      </Field>
      <button
        disabled={fetcher.state !== "idle" || !isDirty}
        className="text-sm btn-blue rounded-full px-4 py-2 font-heading uppercase font-bold"
      >
        {fetcher.state !== "idle" ? "Submitting..." : "Submit"}
      </button>
    </DialogPanel>
  );
}
