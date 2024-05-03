import { Listbox } from "@headlessui/react";
import Icon, { DrawerIcon } from "components/Icon";
import { type Sort, setSort } from "slices/components/marketFilter";
import { useGetter, useSetter } from "store/accessors";
import type { EndowmentsSortKey } from "types/aws";

type Option = { name: string; key: EndowmentsSortKey };
const options: Option[] = [
  { name: "Name", key: "name_internal" },
  { name: "Donations", key: "overall" },
];

export default function Sorter() {
  const dispatch = useSetter();
  const sort = useGetter((state) => state.component.marketFilter.sort);
  const isSortKeySelected = sort !== undefined;

  function handleSortChange(value: EndowmentsSortKey) {
    dispatch(
      setSort({
        key: value,
        direction: "desc" /** default dir when sort is not specified is 'asc'*/,
      })
    );
  }

  function resetSort() {
    dispatch(setSort(undefined));
  }

  function toggleDirection(sort: Sort) {
    dispatch(
      setSort({
        ...sort,
        direction: sort.direction === "asc" ? "desc" : "asc",
      })
    );
  }

  const activeSortName =
    (sort && options.find(({ key }) => key === sort.key))?.name || "sort by";

  return (
    <Listbox
      value={sort?.key}
      onChange={handleSortChange}
      as="div"
      className="relative min-w-[10rem]"
    >
      <div className="w-full h-full flex items-center justify-between text-[0.9375rem] py-2 pl-3 dark:text-navy-l5 border border-gray-l4 rounded-lg font-bold">
        <Listbox.Button className="upppercase flex items-center justify-between w-full">
          {({ open }) => (
            <>
              <span className="uppercase">{activeSortName}</span>
              {!isSortKeySelected && (
                <DrawerIcon isOpen={open} size={20} className="mr-3" />
              )}
            </>
          )}
        </Listbox.Button>

        {sort && (
          //show sort controls
          <>
            <button
              type="button"
              onClick={resetSort}
              className="text-red dark:text-red-l3 mr-2"
            >
              <Icon type="Close" />
            </button>
            <button
              type="button"
              onClick={() => toggleDirection(sort)}
              className="mr-3"
            >
              <Icon type={sort.direction === "asc" ? "Up" : "Down"} />
            </button>
          </>
        )}
      </div>
      <Listbox.Options className="absolute grid bg-gray-l6 dark:bg-blue-d3 w-full py-2 mt-1 z-20 rounded-md shadow-lg border-gray-l2 dark:border-navy">
        {options.map(({ key, name }) => (
          <Listbox.Option
            key={key}
            value={key}
            className="text-sm px-3 py-1 hover:bg-blue-l3 dark:hover:text-blue-d3 dark:text-white cursor-pointer"
          >
            {name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
