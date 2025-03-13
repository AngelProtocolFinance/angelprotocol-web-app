import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ListFilterIcon, XIcon } from "lucide-react";
import useSWR from "swr/immutable";

interface Filter {
  optsFn?: () => Promise<string[]>;
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
  const values = props.filter?.values?.(props._key);
  const is_active = (values?.length ?? 0) > 0 || props.sorter?.value;

  return (
    <div className="flex items-center justify-between gap-x-2">
      <span>{props.name}</span>

      {props.filter && (
        <>
          <Listbox
            as="div"
            className="relative"
            multiple
            value={values}
            onChange={(x) => props.filter?.onChange(x, props._key)}
          >
            <ListboxButton>
              <ListFilterIcon
                size={14}
                className={`${is_active ? "text-green stroke-3" : ""}`}
              />
            </ListboxButton>
            <ListboxOptions
              anchor={{ to: "bottom", gap: 8 }}
              className="bg-white w-max border border-gray-l3 p-2 grid rounded-sm gap-2"
            >
              <Options _key={props._key} {...props.filter} />
            </ListboxOptions>
          </Listbox>
        </>
      )}
    </div>
  );
}

const getFilter = async (path: string) => {
  return fetch(path).then<string[]>((res) => res.json());
};

interface IFilterOptions extends Filter {
  _key: string;
}
export function Options(props: IFilterOptions) {
  const vals = useSWR(
    `/api/irs-npos/aggregates/${props._key}`,
    props.optsFn || getFilter
  );

  if (vals.isLoading) {
    return (
      <ListboxOption value="" disabled={true} className="text-sm">
        Loading..
      </ListboxOption>
    );
  }

  if (vals.error) {
    return (
      <ListboxOption value="" disabled={true} className="text-red text-sm">
        Failed to get filter options
      </ListboxOption>
    );
  }

  if (!vals.data || vals.data.length === 0) {
    return (
      <ListboxOption value="" disabled={true} className="text-sm">
        No options found
      </ListboxOption>
    );
  }

  const is_active = (props.values?.(props._key)?.length ?? 0) > 0;

  return (
    <>
      {is_active && (
        <button
          className="grid grid-cols-subgrid col-span-2 text-sm text-red "
          type="button"
          onClick={() => props.onChange([], props._key)}
        >
          <XIcon size={15} className="justify-self-end" />
          <span className="justify-self-start text-xs uppercase">clear</span>
        </button>
      )}
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
    </>
  );
}
