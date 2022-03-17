import { useState, useMemo } from "react";
import useDebouncer from "hooks/useDebouncer";
import useInitMembers from "./useInitMembers";
import sanitizeRegexSearchText from "helpers/sanitizeRegexSearchText";

export default function useAllianceSelection() {
  const { isInitializing, allianceCopy } = useInitMembers();
  const [searchText, setSearchText] = useState<string>("");
  const [debouncedSearchText, isDebouncing] = useDebouncer<string>(
    searchText,
    300
  );

  const filteredMembers = useMemo(() => {
    const searchRegex = new RegExp(
      sanitizeRegexSearchText(debouncedSearchText).toLocaleLowerCase()
    );
    return allianceCopy.filter((member) =>
      //show toggled members on top of search result
      member.isAdded || member.isDeleted || debouncedSearchText === ""
        ? true
        : member.name.toLocaleLowerCase().search(searchRegex) !== -1 ||
          member.address.search(new RegExp(searchRegex)) !== -1
    );
  }, [debouncedSearchText, allianceCopy]);

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return {
    filteredMembers,
    handleSearchTextChange,
    searchText,
    isInitializing,
    isDebouncing,
  };
}
