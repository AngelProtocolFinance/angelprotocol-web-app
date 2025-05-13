import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Field,
  Input,
  Label,
} from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useFetcher,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "@remix-run/react";
import { useForm } from "react-hook-form";
import { schema, stringNumber } from "schemas/shape";
import type { LoaderData } from "./api";

interface IContent {
  prev: number;
}

export { action, loader } from "./api";
export { ErrorModal as ErrorBoundary } from "components/error";

export default function Form() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { pay_min = "50" } = useLoaderData() as LoaderData;

  const min = +(params.get("min") ?? pay_min ?? "50");

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
  const fetcher = useFetcher({ key: "bal-mov" });
  type FV = { amount: string };

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
  } = useForm<FV>({
    defaultValues: { amount: props.prev.toString() || "" },
    resolver: yupResolver(
      schema<FV>({
        amount: stringNumber(
          (s) => s.required("required"),
          (n) => n.min(50, `minimum of $${50}`)
        ),
      })
    ),
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
