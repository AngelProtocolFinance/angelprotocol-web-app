import {
  Combobox,
  ComboboxInput,
  Description,
  Field,
  Label,
} from "@headlessui/react";
import Image from "components/image";
import { Search, X } from "lucide-react";
import { forwardRef, useState } from "react";
import type { EndowOption } from "../schema";
import { Options } from "./options";

type OnChange = (opts: EndowOption[]) => void;
interface Props {
  values: EndowOption[];
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
      <Label className="block text-sm font-medium mb-2">
        Fundraiser Members <span className="text-red">*</span>
      </Label>
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

            <div className="bg-blue-l5 inline-flex items-center gap-2 text-navy-l1 dark:text-navy-l2 pl-3 rounded-sm">
              <Search size={20} />
              <ComboboxInput
                className="appearance-none bg-transparent first:pl-3 focus:outline-hidden h-10"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                ref={ref}
              />
            </div>
          </div>
        </div>

        <Options
          searchText={searchText}
          classes="absolute top-[calc(100%+10px)] inset-x-0 bg-white border border-gray-l4 z-10 max-h-40 scroller overflow-y-auto rounded-lg shadow-xl shadow-black/5"
        />
      </Combobox>
      <p className="text-red text-xs empty:hidden mt-1">{props.error}</p>
      <Description className="text-sm text-navy-l1 mt-1">
        You may include other nonprofits in a joint fundraiser, if those
        nonprofits have opted in to fundraising functionality. Raised funds will
        be split equally between nonprofits.
      </Description>
    </Field>
  );
});

interface ISelectedOption extends EndowOption {
  onDeselect: (thisOpt: EndowOption) => void;
}

function SelectedOption({ onDeselect, ...props }: ISelectedOption) {
  return (
    <div className="flex items-center px-3 gap-2 h-10 border border-gray-l4 rounded-sm font-semibold text-navy-l1 dark:text-navy-l2">
      <Image src={props.logo} className="w-8" />
      <span className="max-w-[200px] truncate">{props.name}</span>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onDeselect(props);
        }}
      >
        <X size={20} />
      </button>
    </div>
  );
}
