import { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useEndowmentIdNamesQuery } from "services/aws/aws";
import Combobox from "components/Combobox";
import { unsdgs } from "constants/unsdgs";
import { FormValues } from "./schema";

export default function EndowmentCombobox() {
  const {
    formState: { defaultValues },
  } = useFormContext<FormValues>();

  const [query, setQuery] = useState(defaultValues!.endowIdName!.name);

  const handleQueryChange = useCallback((query: string) => setQuery(query), []);

  const { data, isLoading, isError } = useEndowmentIdNamesQuery({
    query: query || "matchall",
    sort: "default",
    endow_types: "Charity",
    tiers: "Level2,Level3",
    sdgs: Object.keys(unsdgs).join(","),
    kyc_only: "true,false",
    start: 0,
  });

  if (defaultValues!.endowIdName!.id !== 0) {
    return null;
  }

  /* ID from defaultValues is the URL param endow ID*/
  return (
    <Combobox<FormValues, "endowIdName">
      fieldName="endowIdName"
      displayValue={(value) => value.name}
      onQueryChange={handleQueryChange}
      optionsQueryState={{
        data: data?.Items,
        isLoading,
        isError,
      }}
      classes={{ container: "min-h-[3rem]" }}
    />
  );
}
