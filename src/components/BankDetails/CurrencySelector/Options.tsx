import { Combobox } from "@headlessui/react";
import { useCurrencisQuery } from "services/aws/wise";
import { isEmpty } from "helpers";

type Props = {
  classes?: string;
  searchText?: string;
};

export default function Options({ classes = "", searchText = "" }: Props) {
  const { data: currencies = [] } = useCurrencisQuery(
    {},
    {
      selectFromResult({ data = [], ...rest }) {
        return {
          data: data.filter((c) => {
            // check whether query matches either the currency name or any of its keywords
            const formatQuery = searchText.toLowerCase().replace(/\s+/g, ""); // ignore spaces and casing
            const matchesCode = c.code.toLowerCase().includes(formatQuery);
            const matchesName = c.name
              .toLowerCase()
              .replace(/\s+/g, "") // ignore spaces and casing
              .includes(formatQuery);

            return matchesCode || matchesName;
          }),
          ...rest,
        };
      },
    }
  );

  return (
    <Combobox.Options
      className={`${classes} w-full bg-white dark:bg-blue-d6 shadow-lg rounded max-h-52 overflow-y-auto scroller text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}
    >
      {isEmpty(currencies) ? (
        <div className="p-2 text-sm cursor-default">Nothing found</div>
      ) : (
        currencies.map(({ code, name }) => (
          <Combobox.Option key={code} value={{ code, name }}>
            {({ active, selected }) => (
              <div
                className={`${active ? "bg-blue-l2 dark:bg-blue-d1" : ""} ${
                  selected ? "font-semibold" : "font-normal"
                } flex items-center gap-2 p-2 text-sm cursor-pointer truncate`}
              >
                {code} - {name}
              </div>
            )}
          </Combobox.Option>
        ))
      )}
    </Combobox.Options>
  );
}
