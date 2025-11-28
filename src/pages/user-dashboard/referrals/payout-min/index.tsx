import { $req } from "@better-giving/schemas";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Field,
  Input,
  Label,
} from "@headlessui/react";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { search } from "helpers/https";
import { useForm } from "react-hook-form";
import { useFetcher, useNavigate, useSearchParams } from "react-router";
import * as v from "valibot";
import { config } from "../config";
import type { Route } from "./+types";

interface IContent {
  prev: number;
}

export { action, loader } from "./api";
export { ErrorModal as ErrorBoundary } from "components/error";

export default function Page({ loaderData: user }: Route.ComponentProps) {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { pay_min = "50" } = user;
  const { min = pay_min } = search(params);

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

const schema = v.object({
  amount: v.lazy((x) => {
    if (!x) return $req;
    return v.pipe(
      $req,
      v.transform((x) => +x),
      v.minValue(config.pay_min, `pay_minimum of $${config.pay_min}`),
      v.transform((x) => x.toString())
    );
  }),
});
interface FV extends v.InferOutput<typeof schema> {}

function Content(props: IContent) {
  const fetcher = useFetcher({ key: "bal-mov" });

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
  } = useForm<FV>({
    defaultValues: { amount: props.prev.toString() || "" },
    resolver: valibotResolver(schema),
  });

  return (
    <DialogPanel
      onSubmit={handleSubmit(async ({ amount }) => {
        fetcher.submit(amount, { method: "put", encType: "text/plain" });
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
          className="px-4 py-3 rounded-lg outline-blue-d1 border border-gray-l3 "
        />
        <span className="text-red text-xs text-right empty:hidden mt-1">
          {errors.amount?.message}
        </span>
      </Field>
      <button
        disabled={fetcher.state !== "idle" || !isDirty}
        className="text-sm btn-blue rounded-full px-4 py-2  uppercase font-bold"
      >
        {fetcher.state !== "idle" ? "Submitting..." : "Submit"}
      </button>
    </DialogPanel>
  );
}
