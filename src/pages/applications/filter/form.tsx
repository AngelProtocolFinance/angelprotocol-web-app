import { PopoverButton, PopoverPanel } from "@headlessui/react";
import countries from "assets/countries/all.json";
import CountrySelector from "components/country-selector";
import { DateInput } from "components/form";
import { X } from "lucide-react";
import type { FC, FormEventHandler } from "react";
import RegStatusDropdown from "./reg-status-dropdown";
import type { FormValues as FV } from "./types";

type Props = {
  submit: FormEventHandler<HTMLFormElement>;
  onReset: FormEventHandler<HTMLFormElement>;
  classes?: string;
};

const Form: FC<Props> = ({ onReset, submit, classes = "" }) => {
  return (
    <PopoverPanel
      as="form"
      onSubmit={submit}
      onReset={onReset}
      className={`${classes} grid content-start gap-4 w-full rounded-sm border border-gray-l3 bg-white dark:bg-blue-d5`}
    >
      <div className="lg:hidden relative text-[1.25rem] px-4 py-3 -mb-4 font-bold uppercase">
        <span className="text-blue-d1">Filters</span>
        <PopoverButton className="absolute top-1/2 -translate-y-1/2 right-2">
          <X size={33} />
        </PopoverButton>
      </div>

      <div className="grid gap-2 px-4 lg:px-6 lg:pt-6">
        <label className="text-sm">HQ Country</label>
        <CountrySelector<FV, "hqCountry">
          placeholder="Select a country"
          fieldName="hqCountry"
          options={countries}
          classes={{
            container: "px-2 dark:bg-blue-d6",
            input: "text-sm py-3.5",
            error: "field-error",
          }}
        />
      </div>

      <div className="grid gap-x-[1.125rem] grid-cols-2 px-4 lg:px-6">
        <label className="col-span-full text-sm mb-2">Date</label>
        <DateInput<FV> name="startDate" />
        <DateInput<FV> name="endDate" />
      </div>

      <RegStatusDropdown classes="px-4 lg:px-6 max-lg:mb-4" />

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
          className="btn btn-blue px-6 py-2 rounded-xs text-xs font-bold uppercase"
        >
          Apply filters
        </button>
      </div>
    </PopoverPanel>
  );
};
export default Form;
