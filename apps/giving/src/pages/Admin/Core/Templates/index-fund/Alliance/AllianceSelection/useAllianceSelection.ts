import { useGetter } from "@/store/accessors";
import { useDebouncer } from "@ap/hooks";
import { useMemo, useState } from "react";

export default function useAllianceSelection() {
  const allianceCopy = useGetter(
    (state) => state.admin.allianceMembers.members
  );
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
      //show modified members on top of search result
      member.isAdded ||
      member.isDeleted ||
      member.edits ||
      debouncedSearchText === ""
        ? true
        : member.name.toLocaleLowerCase().search(searchRegex) !== -1 ||
          member.wallet.search(new RegExp(searchRegex)) !== -1
    );
  }, [debouncedSearchText, allianceCopy]);

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return {
    filteredMembers,
    handleSearchTextChange,
    searchText,
    isDebouncing,
  };
}

function sanitizeRegexSearchText(text: string) {
  return text.replace(/[#-.]|[[-^]|[?|{}]/g, "\\$&");
}
