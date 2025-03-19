import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { CheckField, Field } from "components/form";
import { ListFilterIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import type { IFilter } from "./common";

interface Props extends IFilter {
  classes?: string;
}

export function RangeFilter(props: Props) {
  const raw = props.values || [];
  const is_blank = raw.includes("blank");
  const is_exists = raw.includes("exists");
  const range = raw.filter((t) => t !== "blank" && t !== "exists");

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
    watch,
  } = useForm({
    values: {
      blank: is_blank,
      exists: is_exists,
      min: range[0] || "",
      max: range[1] || "",
    },
  });

  const min = watch("min");
  return (
    <Popover className="flex items-start justify-between gap-x-2">
      <PopoverButton className="mt-1">
        <ListFilterIcon
          size={14}
          className={`${props.is_active ? "text-green stroke-3" : ""}`}
        />
      </PopoverButton>
      <PopoverPanel
        as="form"
        anchor={{ to: "bottom", gap: 8 }}
        className="grid bg-white w-max border border-gray-l3 p-2 rounded-sm gap-2"
        onReset={(e) => {
          e.preventDefault();
          reset(undefined, { keepDirtyValues: false });
          props.onChange?.([]);
        }}
        onSubmit={handleSubmit(({ blank, exists, ...texts }) => {
          const text = Object.values(texts) as string[];
          const vals = text
            .concat([blank ? "blank" : "", exists ? "exists" : ""])
            .filter((x) => x);
          props.onChange?.(vals);
        })}
      >
        <CheckField {...register("blank")} classes="text-xs">
          Blank
        </CheckField>
        <CheckField {...register("exists")} classes="mb-2 text-xs">
          Exists
        </CheckField>

        <Field
          label="Min"
          type="number"
          error={errors.min?.message}
          {...register("min", { min: 0 })}
          classes={{ input: "text-xs py-1 px-2", label: "mb-0! text-xs" }}
        />
        <Field
          label="Max"
          type="number"
          error={errors.max?.message}
          {...register("max", { min, max: 10_000_000_000 })}
          classes={{ input: "text-xs py-1 px-2", label: "mb-0! text-xs" }}
        />
        <div className="flex justify-end space-x-2 mt-4">
          <button type="reset" className="btn btn-outline text-xs px-2 py-1">
            clear
          </button>
          <button
            disabled={!isDirty}
            type="submit"
            className="btn btn-blue text-xs px-2 py-1"
          >
            apply
          </button>
        </div>
      </PopoverPanel>
    </Popover>
  );
}
