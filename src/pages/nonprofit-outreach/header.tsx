import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ListFilter } from "lucide-react";
import useSWR from "swr/immutable";

interface Filter {
  values?: string[];
  onChange: (values: string[]) => void;
}

type Sort = "asc" | "desc" | null;
interface Sorter {
  value?: Sort;
  onChange: (value: Sort) => void;
}

interface IHeader {
  name: string;
  //filtered by key
  _key: string;
  filter?: Filter;
  sorter?: Sorter;
  classes?: string;
}

export function Header(props: IHeader) {
  const is_active =
    (props.filter?.values?.length ?? 0) > 0 || props.sorter?.value;
  return (
    <div className="flex items-center justify-between gap-x-2">
      <span>{props.name}</span>

      {props.filter && (
        <>
          <Listbox
            multiple
            value={props.filter.values}
            onChange={props.filter.onChange}
          >
            <ListboxButton>
              <ListFilter
                size={14}
                className={`${is_active ? "text-green stroke-3" : ""}`}
              />
            </ListboxButton>
            <FilterOptions _key={props._key} />
          </Listbox>
        </>
      )}
    </div>
  );
}

const getFilter = async (path: string) => {
  return fetch(path).then<string[]>((res) => res.json());
};

interface IFilterOptions {
  _key: string;
}
export function FilterOptions(props: IFilterOptions) {
  const vals = useSWR(`/api/irs-npos/aggregates/${props._key}`, getFilter);

  if (vals.isLoading) {
    return (
      <ListboxOptions
        anchor={{ to: "bottom", gap: 8 }}
        className="bg-white w-max border border-gray-l3 p-2 rounded-lg grid gap-2 focus:ring-2 focus:ring-blue-d1 ring-offset-1"
      >
        <ListboxOption value="" disabled={true}>
          Loading..
        </ListboxOption>
      </ListboxOptions>
    );
  }

  if (vals.error) {
    return (
      <ListboxOptions
        anchor={{ to: "bottom", gap: 8 }}
        className="bg-white w-max border border-gray-l3 p-2 rounded-lg grid gap-2 focus:ring-2 focus:ring-blue-d1 ring-offset-1"
      >
        <ListboxOption value="" disabled={true} className="text-red">
          Failed to get filter options
        </ListboxOption>
      </ListboxOptions>
    );
  }

  if (!vals.data || vals.data.length === 0) {
    return (
      <ListboxOptions
        anchor={{ to: "bottom", gap: 8 }}
        className="bg-white w-max border border-gray-l3 p-2 rounded-lg grid gap-2 focus:ring-2 focus:ring-blue-d1 ring-offset-1"
      >
        <ListboxOption value="" disabled={true}>
          No options found
        </ListboxOption>
      </ListboxOptions>
    );
  }

  return (
    <ListboxOptions
      anchor={{ to: "bottom", gap: 8 }}
      className="bg-white w-max border border-gray-l3 p-2 rounded-lg grid gap-2 focus:ring-2 focus:ring-blue-d1 ring-offset-1"
    >
      {vals.data.map((opt) => (
        <ListboxOption
          key={opt}
          value={opt}
          className="group gap-2 bg-white data-[focus]:bg-blue-l4 flex justify-between items-center px-2 py-1"
        >
          <CheckIcon
            size={14}
            className="invisible group-data-[selected]:visible text-green"
          />
          {opt}
        </ListboxOption>
      ))}
    </ListboxOptions>
  );
}
