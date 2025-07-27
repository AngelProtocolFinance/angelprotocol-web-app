import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { CheckField, Field, toYYYMMDD } from "components/form";
import { subWeeks } from "date-fns";
import { endOfDay, iso_date, startOfDay } from "helpers/date";
import { ListFilterIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as v from "valibot";
import type { IFilter } from "./common";

export const schema = v.pipe(
  v.object({
    start_date: v.optional(iso_date(startOfDay)),
    end_date: v.optional(iso_date(endOfDay)),
    blank: v.boolean(),
    exists: v.boolean(),
    // not set by user
  }),
  v.forward(
    v.partialCheck(
      [["start_date"], ["end_date"]],
      ({ start_date: a, end_date: b }) => {
        return a && b ? a <= b : true;
      },
      "start date must be earlier than end date"
    ),
    ["start_date"]
  )
);

export interface FV extends v.InferOutput<typeof schema> {}

interface Props extends IFilter {
  classes?: string;
}

export function DateFilter(props: Props) {
  const raw = props.values || [];
  const is_blank = raw.includes("blank");
  const is_exists = raw.includes("exists");
  const [start_date, end_date] = raw.filter(
    (t) => t !== "blank" && t !== "exists"
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = useForm<FV>({
    resolver: valibotResolver(schema),
    values: {
      blank: is_blank,
      exists: is_exists,
      start_date: toYYYMMDD(
        start_date ? new Date(start_date) : subWeeks(new Date(), 1)
      ),
      end_date: toYYYMMDD(end_date ? new Date(end_date) : new Date()),
    },
  });
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
        onSubmit={handleSubmit(
          ({ blank, exists, ...texts }) => {
            const text = Object.values(texts) as string[];
            const vals = text
              .concat([blank ? "blank" : "", exists ? "exists" : ""])
              .filter((x) => x);
            props.onChange?.(vals);
          },
          (err) => {
            console.log(err);
          }
        )}
      >
        <CheckField {...register("blank")} classes="text-xs">
          Blank
        </CheckField>
        <CheckField {...register("exists")} classes="mb-2 text-xs">
          Exists
        </CheckField>

        <Field
          label="Start date"
          type="date"
          error={errors.start_date?.message}
          {...register("start_date")}
          classes={{ input: "text-xs py-1 px-2", label: "mb-0! text-xs" }}
        />
        <Field
          label="End date"
          type="date"
          error={errors.end_date?.message}
          {...register("end_date")}
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
