import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Field } from "components/form";
import { DrawerIcon } from "components/icon";
import { FilterIcon, XIcon } from "lucide-react";
import { useRef } from "react";
import { useController, useForm } from "react-hook-form";
import { status } from "./constants";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { Select } from "components/selector/select";
import type { BankingApplicationsQueryParams } from "types/applications";
import * as v from "valibot";

type Props = {
  classes?: string;
  params: URLSearchParams;
  setParams: (params: BankingApplicationsQueryParams) => void;
  isDisabled: boolean;
};

const int_id_param = v.pipe(
  v.string(),
  v.trim(),
  v.transform((x) => +x),
  v.integer("invalid id"),
  v.minValue(0, "invalid id"),
  v.transform((x) => x.toString())
);

const schema = v.object({
  endowment_id: v.optional(int_id_param),
  // from dropdown
  status: v.optional(v.string()),
});

interface FV extends v.InferOutput<typeof schema> {}

export default function Filter({
  setParams,
  classes = "",
  isDisabled,
  params,
}: Props) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<FV>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: valibotResolver(schema),
    defaultValues: {
      endowment_id: params.get("endowmentID") || "",
      status: params.get("status") || "under-review",
    },
  });

  const { field: stat } = useController({ control, name: "status" });

  function submit(fv: FV) {
    const params: BankingApplicationsQueryParams = {};
    if (fv.endowment_id) params.endowmentID = +fv.endowment_id;
    if (fv.status) params.status = fv.status as any;
    setParams(params);
    buttonRef.current?.click();
  }

  return (
    <Popover className={`${classes} flex relative items-center`}>
      <PopoverButton
        ref={buttonRef}
        disabled={isDisabled}
        className="w-full lg:w-[22.3rem] flex justify-center items-center p-3 rounded-sm bg-blue-d1 text-white lg:dark:text-gray lg:text-gray lg:bg-white lg:dark:bg-blue-d6 lg:justify-between disabled:bg-gray lg:disabled:bg-gray-l3 lg:dark:disabled:bg-gray-d3 lg:border lg:border-gray-l3"
      >
        {({ open }) => (
          <>
            <FilterIcon className="lg:hidden mr-1" size={16} />
            <div className="uppercase font-semibold text-[0.9375rem] ">
              Filter
            </div>
            <DrawerIcon isOpen={open} className="hidden lg:inline" size={21} />
          </>
        )}
      </PopoverButton>

      <PopoverPanel
        as="form"
        onSubmit={handleSubmit(submit)}
        onReset={() => {
          reset();
          setParams({});
          buttonRef.current?.click();
        }}
        className="max-lg:fixed max-lg:inset-x-0 max-lg:top-0 lg:mt-1 absolute top-full z-20 grid content-start gap-4 w-full rounded-sm border border-gray-l3 bg-white dark:bg-blue-d5"
      >
        <div className="lg:hidden relative text-[1.25rem] px-4 py-3 -mb-4 font-bold uppercase">
          <span className="text-blue-d1">Filters</span>
          <PopoverButton className="absolute top-1/2 -translate-y-1/2 right-2">
            <XIcon size={33} />
          </PopoverButton>
        </div>
        <Field
          {...register("endowment_id")}
          label="Endowment ID"
          classes="mx-4 lg:mx-6 mt-4"
          error={errors.endowment_id?.message}
        />

        <Select
          ref={stat.ref}
          value={stat.value ?? ""}
          onChange={stat.onChange}
          options={Object.keys(status)}
          option_disp={(x) => (status as any)[x]}
          classes={{
            button: "dark:bg-blue-d6",
            options: "text-sm",
            container: "px-5",
          }}
        />

        <div className="max-lg:row-start-2 flex gap-x-4 items-center justify-between max-lg:px-4 max-lg:py-3 p-6 lg:mt-2 bg-blue-l5 dark:bg-blue-d7 border-y lg:border-t border-gray-l3">
          <h3 className="uppercase lg:hidden">Filter by</h3>
          <button
            type="reset"
            className="text-blue-d1 underline text-sm max-lg:ml-auto"
          >
            Reset filters
          </button>
          <button
            type="submit"
            className="btn btn btn-blue px-6 py-2 rounded-xs text-xs font-bold uppercase"
          >
            Apply filters
          </button>
        </div>
      </PopoverPanel>
    </Popover>
  );
}
