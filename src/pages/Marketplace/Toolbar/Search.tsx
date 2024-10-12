import debounce from "lodash/debounce";
import { SearchIcon } from "lucide-react";
import { type ChangeEventHandler, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

export default function Search({ classes = "" }: { classes?: string }) {
  const ref = useRef<ReturnType<typeof debounce>>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [params, setParams] = useSearchParams();
  const q = decodeURIComponent(params.get("query") || "");
  const _id = params.get("_f") || "";

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const n = new URLSearchParams(params);
    n.set("query", encodeURIComponent(e.target.value));
    n.set("page", "1");
    n.set("_f", "search");
    setParams(n, {
      replace: true,
      preventScrollReset: true,
    });
  };

  useEffect(() => {
    if (!_id) return;
    inputRef.current?.focus();
  }, [_id]);

  useEffect(() => {
    return () => {
      ref.current?.cancel();
    };
  }, []);

  return (
    <div
      className={`${classes} flex gap-2 items-center border border-gray-l4 rounded-lg relative`}
    >
      <SearchIcon
        size={20}
        className="absolute left-3 top-1/2 -translate-y-1/2"
      />
      <input
        ref={inputRef}
        defaultValue={q}
        onChange={debounce(onChange, 500)}
        className="w-full h-full p-3 pl-10 placeholder:text-navy-l3 text-navy-d4 font-medium font-heading rounded-lg outline-blue-d1 outline-offset-4"
        placeholder={q || "Search organizations..."}
      />
    </div>
  );
}
