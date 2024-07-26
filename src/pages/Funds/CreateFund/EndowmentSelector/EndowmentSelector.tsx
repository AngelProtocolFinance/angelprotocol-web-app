import { Combobox, ComboboxInput, Field, Label } from "@headlessui/react";
import Icon from "components/Icon";
import { forwardRef, useState } from "react";
import type { FundMember } from "../types";
import { Options } from "./Options";

interface EndowmentOption extends FundMember {}

type OnChange = (opts: EndowmentOption[]) => void;
interface Props {
  values: EndowmentOption[];
  onChange: OnChange;
  classes?: string;
  disabled?: boolean;
  error?: string;
}

type El = HTMLInputElement;

export const EndowmentSelector = forwardRef<El, Props>((props, ref) => {
  const [searchText, setSearchText] = useState("");

  return (
    <Field className={props.classes ?? "relative"}>
      <Label className="mb-2 block font-medium">Select endowments</Label>
      <Combobox
        immediate
        disabled={props.disabled}
        value={props.values}
        by="id"
        onChange={props.onChange}
        as="div"
        className="relative"
        multiple
      >
        <div
          aria-invalid={!!props.error}
          aria-disabled={props.disabled}
          className="flex items-center field-input min-h-[3rem] justify-between flex-wrap gap-2 h-full focus-within:ring-2 ring-blue-d1 ring-offset-1 aria-invalid:border-red p-1"
        >
          <div className="flex flex-wrap gap-2 h-full">
            {props.values.map((v) => (
              <SelectedOption
                key={v.id}
                {...v}
                onDeselect={(thisOpt) =>
                  props.onChange(
                    props.values.filter((v) => v.id !== thisOpt.id)
                  )
                }
              />
            ))}

            <div className="bg-blue-l5 inline-flex items-center gap-2 text-navy-l1 dark:text-navy-l2 pl-3 rounded">
              <Icon type="Search" size={20} />
              <ComboboxInput
                className="appearance-none bg-transparent first:pl-3 focus:outline-none h-10"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                ref={ref}
              />
            </div>
          </div>
        </div>

        <Options
          searchText={searchText}
          classes="absolute inset-x-0 bg-white border border-gray-l4 z-10 h-40 scroller overflow-y-auto"
        />
      </Combobox>
      <p className="text-red text-xs empty:hidden mt-1">{props.error}</p>
    </Field>
  );
});

interface ISelectedOption extends EndowmentOption {
  onDeselect: (thisOpt: EndowmentOption) => void;
}

function SelectedOption({ onDeselect, ...props }: ISelectedOption) {
  return (
    <div className="flex items-center px-3 gap-2 h-10 bg-blue-l4 dark:bg-blue-d4 border border-gray-l4 rounded font-semibold text-navy-l1 dark:text-navy-l2 uppercase">
      <span className="max-w-[200px] truncate">{props.name}</span>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onDeselect(props);
        }}
      >
        <Icon type="Close" size={20} />
      </button>
    </div>
  );
}
