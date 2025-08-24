import { DialogPanel } from "@headlessui/react";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Field } from "components/form";
import { humanize } from "helpers/decimal";
import { InfoIcon, MoveLeft, MoveRight } from "lucide-react";
import { useController, useForm } from "react-hook-form";
import { type Props, type Schema, schema } from "./types";

export function Panel(props: Props) {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
    control,
  } = useForm<Schema>({
    defaultValues: {
      source: props.from || "liq",
      bals: props.bals,
    },
    resolver: valibotResolver(schema),
  });

  const { field: source } = useController({ name: "source", control });

  return (
    <DialogPanel
      onSubmit={handleSubmit(props.onSubmit)}
      as="form"
      className="fixed-center z-10 grid text-gray-d4 bg-white sm:w-full w-[90vw] sm:max-w-lg rounded-lg p-6"
    >
      <h4 className="mb-3 text-xl">
        Transfer{" "}
        {props.from
          ? props.from === "liq"
            ? "to Investments"
            : "to Savings"
          : null}
      </h4>

      {props.from ? (
        <div>
          <p className="text-gray text-sm font-semibold">Balance</p>
          <p className="text-lg font-semibold text-gray-l1">
            ${humanize(props.bals[source.value])}
          </p>
        </div>
      ) : (
        <div className="grid items-center grid-cols-[1fr_auto_1fr] gap-x-4 border-y border-gray-l3 py-4">
          <p className="font-heading justify-self-end">
            <span className="text-gray text-xs mr-1">from</span>
            {source.value === "liq" ? (
              <span className="text-amber font-semibold">Savings</span>
            ) : (
              <span className="text-green font-semibold">Investments</span>
            )}
            <span className="text-sm font-semibold text-gray-l1 ml-2">
              ${humanize(props.bals[source.value])}
            </span>
          </p>

          <button
            type="button"
            onClick={() =>
              source.onChange(source.value === "liq" ? "lock" : "liq")
            }
            className="relative p-6 border-t hover:outline hover:outline-blue-l1 outline-blue-l1  border-gray-l4 shadow-xl shadow-black/10 rounded-full group"
          >
            <div className="absolute-center">
              <MoveLeft
                size={20}
                strokeWidth={2}
                className="relative top-1.5 right-1 group-active:right-1.5 stroke-gray-l1"
              />
              <MoveRight
                size={20}
                strokeWidth={2}
                className={`relative bottom-1.5 left-1 group-active:left-1.5 ${source.value === "liq" ? "stroke-green-d1" : "stroke-amber-d1"}`}
              />
            </div>
          </button>
          <p className="font-heading justify-self-start">
            <span className="text-gray text-xs mr-1">to</span>
            {source.value === "liq" ? (
              <span className="text-green font-semibold">Investments</span>
            ) : (
              <span className="text-amber font-semibold">Savings</span>
            )}
          </p>
        </div>
      )}

      <Field
        classes="mt-4"
        required
        label="Amount"
        {...register("amount")}
        placeholder="e.g. $ 100"
        error={errors.amount?.message}
      />

      {source.value && (
        <div className="text-sm text-amber-d1 bg-amber-l5  rounded-md p-2 mt-4">
          <InfoIcon className="inline relative bottom-px" size={15} /> This
          operation is irreversible.{" "}
          {source.value === "liq"
            ? "Transferring to investments purchases underlying asset of corresponding value"
            : "Withdrawing from investments redeems underlying asset of corresponding value after approval"}
          .
        </div>
      )}

      <button
        disabled={props.is_submitting || !isDirty}
        className="text-sm btn-blue rounded-sm p-4 font-heading uppercase font-bold mt-8"
      >
        {props.is_submitting ? "Submitting..." : "Submit"}
      </button>
    </DialogPanel>
  );
}
