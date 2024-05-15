import { Popover } from "@headlessui/react";
import Icon from "components/Icon";
import { Field } from "components/form";
import type { FC, FormEventHandler } from "react";
import StatusDropdown from "./StatusDropdown";
import type { FormValues } from "./types";

type Props = {
  submit: FormEventHandler<HTMLFormElement>;
  onReset: FormEventHandler<HTMLFormElement>;
  classes?: string;
};

const Form: FC<Props> = ({ onReset, submit, classes = "" }) => {
  return (
    <Popover.Panel
      as="form"
      onSubmit={submit}
      onReset={onReset}
      className={`${classes} grid content-start gap-4 w-full rounded border border-gray-l4 bg-white dark:bg-blue-d5`}
    >
      <div className="lg:hidden relative text-[1.25rem] px-4 py-3 -mb-4 font-bold uppercase">
        <span className="text-blue-d1">Filters</span>
        <Popover.Button className="absolute top-1/2 -translate-y-1/2 right-2">
          <Icon type="Close" size={33} />
        </Popover.Button>
      </div>
      <Field<FormValues>
        name="endowmentID"
        label="Endowment ID"
        classes="mx-4 lg:mx-6 mt-4"
      />
      <StatusDropdown classes="px-4 lg:px-6 max-lg:mb-4" />

      <div className="max-lg:row-start-2 flex gap-x-4 items-center justify-between max-lg:px-4 max-lg:py-3 p-6 lg:mt-2 bg-blue-l5 dark:bg-blue-d7 border-y lg:border-t border-gray-l4">
        <h3 className="uppercase lg:hidden">Filter by</h3>
        <button
          type="reset"
          className="text-blue-d1 underline text-sm max-lg:ml-auto"
        >
          Reset filters
        </button>
        <button
          type="submit"
          className="btn btn-blue px-6 py-2 rounded-sm text-xs font-bold uppercase"
        >
          Apply filters
        </button>
      </div>
    </Popover.Panel>
  );
};
export default Form;
