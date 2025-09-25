import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ListFilterIcon, XIcon } from "lucide-react";
import useSWR from "swr/immutable";
import type { IFilter } from "./common";

interface Props extends IFilter {
  optsFn?: () => Promise<string[]>;
}

export function ListFilter(props: Props) {
  return (
    <Listbox multiple value={props.values} onChange={props.onChange}>
      <ListboxButton className="mt-1">
        <ListFilterIcon
          size={14}
          className={`${props.is_active ? "text-green stroke-3" : ""}`}
        />
      </ListboxButton>
      <ListboxOptions
        anchor={{ to: "bottom", gap: 8 }}
        className="bg-white w-max border border-gray-l3 p-2 grid rounded-sm gap-2"
      >
        <Options {...props} />
      </ListboxOptions>
    </Listbox>
  );
}

const getFilter = async (path: string) => {
  return fetch(path).then<string[]>((res) => res.json());
};

export function Options(props: Props) {
  const vals = useSWR(
    `/api/irs-npos-aggregates/${props._key}`,
    props.optsFn || getFilter
  );

  if (vals.isLoading) {
    return (
      <ListboxOption value="" disabled={true} className="text-sm">
        Loading..
      </ListboxOption>
    );
  }

  if (vals.error || !vals.data) {
    return (
      <ListboxOption value="" disabled={true} className="text-red text-sm">
        Failed to get filter options
      </ListboxOption>
    );
  }

  return (
    <>
      {props.is_active && (
        <button
          className="grid grid-cols-subgrid col-span-2 text-sm text-red "
          type="button"
          onClick={() => props.onChange([])}
        >
          <XIcon size={15} className="justify-self-end" />
          <span className="justify-self-start text-xs uppercase">clear</span>
        </button>
      )}
      {["blank", "exists"].concat(vals.data).map((opt) => (
        <ListboxOption
          key={opt}
          value={opt}
          className="group grid grid-cols-subgrid col-span-2 gap-x-4 bg-white data-[focus]:bg-blue-l4 items-center px-2 py-1"
        >
          <CheckIcon
            size={14}
            className="invisible group-data-[selected]:visible text-green justify-self-end"
          />
          <span className="justify-self-start text-sm">{opt}</span>
        </ListboxOption>
      ))}
    </>
  );
}
