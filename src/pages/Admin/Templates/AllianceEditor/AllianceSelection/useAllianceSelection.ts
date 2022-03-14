import { useState, useMemo } from "react";
import useDebouncer from "hooks/useDebouncer";
import useInitMembers from "./useInitMembers";

export default function useAllianceSelection() {
  const { isInitializing, allianceCopy } = useInitMembers();
  const [searchText, setSearchText] = useState<string>("");
  const [debouncedSearchText, isDebouncing] = useDebouncer<string>(
    searchText,
    300
  );

  const searchRegex = new RegExp(
    sanitizeRegexTextInput(debouncedSearchText).toLocaleLowerCase()
  );
  const filteredMembers = useMemo(
    () =>
      allianceCopy.filter((member) =>
        //show toggled members on top of search result
        member.isAdded || member.isDeleted || debouncedSearchText === ""
          ? true
          : member.name.toLocaleLowerCase().search(searchRegex) !== -1 ||
            member.address.search(new RegExp(searchRegex)) !== -1
      ),
    [debouncedSearchText, allianceCopy]
  );

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

//on cases where user deliberately types regex characters
function sanitizeRegexTextInput(text: string) {
  return text.replace(/[#-.]|[[-^]|[?|{}]/g, "\\$&");
}
