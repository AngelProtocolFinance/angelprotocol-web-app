import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ListFilterIcon } from "lucide-react";
import useSWR from "swr/immutable";

interface Filter {
  valuesFn?: () => Promise<string[]>;
  values?: (key: string) => string[];
  onChange: (values: string[], key: string) => void;
}

type Sort = "asc" | "desc" | null;
interface Sorter {
  value?: Sort;
  onChange: (value: Sort) => void;
}

interface IListFilter {
  name: string;
  //filtered by key
  _key: string;
  filter?: Filter;
  sorter?: Sorter;
  classes?: string;
}

export function ListFilter(props: IListFilter) {
  const is_active =
    (props.filter?.values?.(props._key).length ?? 0) > 0 || props.sorter?.value;

  console.log(props.filter?.values);
  return (
    <div className="flex items-center justify-between gap-x-2">
      <span>{props.name}</span>

      {props.filter && (
        <>
          <Listbox
            multiple
            value={props.filter.values?.(props._key)}
            onChange={(x) => props.filter?.onChange(x, props._key)}
          >
            <ListboxButton>
              <ListFilterIcon
                size={14}
                className={`${is_active ? "text-green stroke-3" : ""}`}
              />
            </ListboxButton>
            <FilterOptions _key={props._key} valuesFn={props.filter.valuesFn} />
          </Listbox>
        </>
      )}
    </div>
  );
}

const getFilter = async (path: string) => {
  return fetch(path).then<string[]>((res) => res.json());
};

interface IFilterOptions extends Pick<Filter, "valuesFn"> {
  _key: string;
}
export function FilterOptions(props: IFilterOptions) {
  const vals = useSWR(
    `/api/irs-npos/aggregates/${props._key}`,
    props.valuesFn || getFilter
  );

  if (vals.isLoading) {
    return (
      <ListboxOptions
        anchor={{ to: "bottom", gap: 8 }}
        className="bg-white w-max border border-gray-l3 p-2 rounded-lg grid gap-2 focus:ring-2 focus:ring-blue-d1 ring-offset-1"
      >
        <ListboxOption value="" disabled={true} className="text-sm">
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
        <ListboxOption value="" disabled={true} className="text-red text-sm">
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
        <ListboxOption value="" disabled={true} className="text-sm">
          No options found
        </ListboxOption>
      </ListboxOptions>
    );
  }

  return (
    <ListboxOptions
      anchor={{ to: "bottom", gap: 8 }}
      className="grid grid-cols-[auto_1fr] bg-white w-max border border-gray-l3 p-2 rounded-lg gap-2 focus:ring-2 focus:ring-blue-d1 ring-offset-1"
    >
      {["blank"].concat(vals.data).map((opt) => (
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
    </ListboxOptions>
  );
}
