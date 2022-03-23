import { useState } from "react";
import useDebouncer from "hooks/useDebouncer";
import useAllianceMembers from "./useAllianceMembers";
import ToolBar from "./Toolbar";
import MembersTable from "./MembersTable";

export default function AllianceMembers() {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, isDebouncing] = useDebouncer<string>(
    searchText,
    300
  );

  const { filteredMembers, isInitializing } =
    useAllianceMembers(debouncedSearchText);

  function handleSearchTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }

  return (
    <div className="bg-white rounded-sm overflow-hidden">
      <ToolBar
        handleSearchTextChange={handleSearchTextChange}
        searchText={searchText}
      />
      {(filteredMembers.length > 0 && (
        <MembersTable members={filteredMembers} />
      )) ||
        (isInitializing ? (
          <p className="pl-4 pt-4 font-mono text-angel-grey">
            loading members...
          </p>
        ) : (
          <p className="pl-4 pt-4 font-mono text-angel-grey">
            {`${
              isDebouncing ? `searching ${searchText}...` : "no member found"
            }`}
          </p>
        ))}
    </div>
  );
}
