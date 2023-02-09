import { useEffect, useState } from "react";
import Icon from "components/Icon";
import useDebouncer from "hooks/useDebouncer";

type Props = {
  classes?: string;
  isSearching?: boolean;
  placeholder?: string;
  onChange(query: string): void;
};

export default function Search({
  classes = "",
  isSearching = false,
  placeholder = "",
  onChange,
}: Props) {
  const [query, setQuery] = useState("");

  const [debouncedQuery, isDebouncing] = useDebouncer(query, 500);

  useEffect(() => {
    onChange(debouncedQuery);
  }, [debouncedQuery, onChange]);

  const isLoading = isSearching || isDebouncing;

  return (
    <div
      className={`${classes} flex gap-2 items-center dark:text-gray-l2 border border-prim rounded-lg overflow-clip`}
    >
      <Icon
        type={isLoading ? "Loading" : "Search"}
        size={20}
        className={`ml-2 ${isLoading ? "animate-spin" : ""}`}
      />
      <input
        value={query}
        onChange={({ target: { value } }) => setQuery(value)}
        className="focus:outline-none w-full py-2 pr-3 bg-transparent dark:placeholder:text-gray-l2"
        placeholder={placeholder}
      />
    </div>
  );
}
