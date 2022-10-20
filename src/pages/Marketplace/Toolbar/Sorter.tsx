import { Listbox } from "@headlessui/react";
import { EndowmentsSortKey } from "types/aws";
import Icon, { DrawerIcon } from "components/Icon";
import { useGetter, useSetter } from "store/accessors";
import { Sort, setSort } from "slices/components/marketFilter";

type Option = { name: string; key: EndowmentsSortKey };
const options: Option[] = [{ name: "Name", key: "name" }];

export default function Sorter() {
  const dispatch = useSetter();
  const sort = useGetter((state) => state.component.marketFilter.sort);
  const isSortKeySelected = sort !== undefined;

  function handleSortChange(value: EndowmentsSortKey) {
    dispatch(setSort({ key: value, isAscending: false }));
  }

  function resetSort() {
    dispatch(setSort(undefined));
  }

  function toggleDirection(sort: Sort) {
    dispatch(setSort({ ...sort, isAscending: !sort.isAscending }));
  }

  return (
    <Listbox
      value={sort?.key}
      onChange={handleSortChange}
      as="div"
      className="relative min-w-[10rem]"
    >
      <div className="w-full h-full flex items-center justify-between text-sm py-2 pl-3 dark:text-gray-l2 border border-gray-l2 dark:border-bluegray-d1 rounded-md">
        <Listbox.Button className="upppercase flex items-center justify-between w-full">
          {({ open }) => (
            <>
              <span className="uppercase">{sort?.key || "sort by"}</span>
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
              <Icon type={sort.isAscending ? "Up" : "Down"} />
            </button>
          </>
        )}
      </div>
      <Listbox.Options
        className={
          "absolute grid bg-orange-l6 dark:bg-blue-d3 w-full py-2 mt-1 z-20 rounded-md shadow-lg border-gray-l1 dark:border-bluegray-d1"
        }
      >
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
