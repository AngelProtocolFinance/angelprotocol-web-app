import Icon from "components/Icon";
import debounce from "lodash/debounce";
import type { ChangeEvent } from "react";
import { useFetcher, useSearchParams } from "react-router-dom";

interface Props {
  onChange: (text: string) => void;
  classes?: string;
}
export default function SearchField({ classes = "", onChange }: Props) {
  const [params] = useSearchParams();
  const { load } = useFetcher({ key: "home" });

  function handleChange(ev: ChangeEvent<HTMLInputElement>) {
    const val = ev.target.value;
    onChange(val);
    const n = new URLSearchParams(params);
    n.set("query", val);
    load(`?${n.toString()}`);
  }

  return (
    <div
      className={`${classes} flex items-center px-4 py-1 text-sm gap-1 font-heading`}
    >
      <label htmlFor="__endow-search">
        <Icon type="Search" className="mr-1 text-2xl text-gray" />
      </label>
      <input
        onChange={debounce(handleChange, 500)}
        id="__endow-search"
        type="text"
        placeholder="Search causes..."
        className="focus:outline-none text-lg placeholder:text-gray text-navy-l1 autofill:bg-white"
      />
    </div>
  );
}
