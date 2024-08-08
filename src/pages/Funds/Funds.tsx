import Icon from "components/Icon";
import { useState } from "react";
import Cards from "./Cards";

export function Component() {
  const [search, setSearch] = useState("");
  return (
    <div className="padded-container mt-8">
      <div
        className={`flex gap-2 items-center rounded-lg overflow-clip field-container`}
      >
        <Icon type="Search" size={20} className="ml-2" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full py-2 pr-3 placeholder:text-navy-l3 text-navy-d4 font-medium font-heading"
          placeholder="Search funds..."
        />
      </div>
      <Cards search={search} classes="mt-4" />
    </div>
  );
}
