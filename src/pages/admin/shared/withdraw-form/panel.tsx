import { DialogPanel } from "@headlessui/react";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Field } from "components/form";
import { Select } from "components/selector";
import { humanize } from "helpers/decimal";
import { useController, useForm } from "react-hook-form";
import { type Props, type Schema, type Source, schema, sources } from "./types";

const opts_display: { [K in Source]: string } = {
  liq: "Savings",
  lock: "Investments",
};

export function Panel(props: Props) {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
    control,
  } = useForm<Schema>({
    defaultValues: {
      source: props.from,
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
      <h4 className="mb-3 text-xl">Withdraw</h4>

      <Select
        required
        ref={source.ref}
        label="Withdraw from"
        onChange={source.onChange}
        value={source.value}
        options={sources as any}
        error={errors.source?.message}
        option_disp={(opt) =>
          opt && (
            <p className="text-sm">
              <span>{opts_display[opt]}: </span>
              <span className="text-gray">${humanize(props.bals[opt])}</span>
            </p>
          )
        }
        disabled={props.is_submitting || !!props.from}
      />
      <Field
        classes="mt-5"
        required
        label="Amount"
        {...register("amount")}
        placeholder="e.g. $ 100"
        error={errors.amount?.message}
      />

      <button
        disabled={props.is_submitting || !isDirty}
        className="text-sm btn-blue rounded-sm p-4 font-heading uppercase font-bold mt-8"
      >
        {props.is_submitting ? "Submitting..." : "Submit"}
      </button>
    </DialogPanel>
  );
}
