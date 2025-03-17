import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import {
  NativeCheckField as CheckField,
  NativeField as Field,
} from "components/form";
import { ListFilterIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import type { IFilter } from "./common";

interface Props extends IFilter {
  description: string;
  num: number;
  classes?: string;
}

export function TextFilter(props: Props) {
  const raw = props.values || [];
  const is_blank = raw.includes("blank");
  const is_exists = raw.includes("exists");
  const filtered = raw.filter((t) => t !== "blank" && t !== "exists");

  const texts =
    filtered.length > 0
      ? filtered
      : Array.from({ length: props.num }, () => "");

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({
    values: {
      blank: is_blank,
      exists: is_exists,
      ...texts.reduce((acc, t, idx) => ({ ...acc, [`text${idx}`]: t }), {}),
    },
  });
  return (
    <Popover className="relative flex items-start justify-between gap-x-2">
      <PopoverButton className="mt-1">
        <ListFilterIcon
          size={14}
          className={`${props.is_active ? "text-green stroke-3" : ""}`}
        />
      </PopoverButton>
      <PopoverPanel
        as="form"
        anchor={{ to: "bottom", gap: 8 }}
        className="bg-white w-max border border-gray-l3 p-2 grid rounded-sm gap-2"
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
        <p className="text-xs text-gray max-w-40">{props.description}</p>
        {Array.from({ length: props.num }, (_, i) => (
          <Field
            key={i}
            label=""
            {...register(`text${i}` as any)}
            classes={{ input: "text-xs py-1 px-2", label: "mb-0! text-xs" }}
          />
        ))}
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
