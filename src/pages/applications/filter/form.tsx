import type { QueryParams } from "@better-giving/registration/approval";
import { PopoverButton, PopoverPanel } from "@headlessui/react";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Combo } from "components/combo";
import { NativeField, dateToFormFormat } from "components/form";
import { DrawerIcon } from "components/icon";
import { List } from "components/selector";
import { countries, country_names } from "constants/countries";
import { subWeeks } from "date-fns";
import { X } from "lucide-react";
import type { FC } from "react";
import { useController, useForm } from "react-hook-form";
import { statuses } from "./constants";
import { type FV, schema } from "./schema";
type Props = {
  onSubmit: (data: FV) => void;
  onReset: () => void;
  params: QueryParams;
  classes?: string;
};

export const Form: FC<Props> = ({
  onReset,
  onSubmit,
  params,
  classes = "",
}) => {
  const status = statuses.find((s) => s.value === params.status);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FV>({
    resolver: valibotResolver(schema),
    values: {
      //set default value so empty can be tagged as invalid
      start_date: dateToFormFormat(
        params.startDate ? new Date(params.startDate) : subWeeks(new Date(), 1)
      ),
      end_date: dateToFormFormat(
        params.endDate ? new Date(params.endDate) : new Date()
      ),
      country: params.country ?? "",
      status: status || { label: "Under Review", value: "02" },
    },
  });

  const { field: country } = useController({ name: "country", control });
  const { field: stat } = useController({ name: "status", control });

  return (
    <PopoverPanel
      as="form"
      onSubmit={handleSubmit(onSubmit, (err) => {
        console.log(err);
      })}
      onReset={(e) => {
        e.preventDefault();
        reset();
        onReset();
      }}
      className={`${classes} grid content-start gap-4 w-full rounded-sm border border-gray-l3 bg-white dark:bg-blue-d5`}
    >
      <div className="lg:hidden relative text-[1.25rem] px-4 py-3 -mb-4 font-bold uppercase">
        <span className="text-blue-d1">Filters</span>
        <PopoverButton className="absolute top-1/2 -translate-y-1/2 right-2">
          <X size={33} />
        </PopoverButton>
      </div>

      <div className="px-6 lg:pt-6">
        <Combo
          value={country.value}
          onChange={country.onChange}
          label="Country"
          placeholder="Select a country"
          options={country_names}
          classes={{ input: "pl-12" }}
          option_disp={(c) => (
            <>
              <span className="text-2xl">{countries[c].flag}</span>
              <span>{c}</span>
            </>
          )}
          btn_disp={(c, open) => {
            const flag = countries[c]?.flag;
            return flag ? (
              <span data-flag className="text-2xl">
                {flag}
              </span>
            ) : (
              <DrawerIcon
                isOpen={open}
                size={20}
                className="justify-self-end dark:text-gray shrink-0"
              />
            );
          }}
        />

        <div className="grid gap-x-[1.125rem] grid-cols-2 mt-4">
          <label className="col-span-full text-sm mb-2">Date</label>
          <NativeField
            {...register("start_date")}
            label=""
            type="date"
            error={errors.start_date?.message}
          />
          <NativeField
            {...register("end_date")}
            label=""
            type="date"
            error={errors.end_date?.message}
          />
        </div>

        <List
          value={stat.value}
          onChange={stat.onChange}
          label="Application Status"
          classes={{
            button: "dark:bg-blue-d6",
            options: "text-sm",
            container: "max-lg:mb-4 mt-4",
          }}
          options={statuses}
        />
      </div>

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
  );
};
