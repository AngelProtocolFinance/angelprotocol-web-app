import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useEndowmentIdNamesQuery } from "services/aws/aws";
import Combobox from "components/Combobox";
import Split from "components/Split";
import { CheckField } from "components/form/CheckField";
import { unsdgs } from "constants/unsdgs";
import DenomSelector from "./DenomSelector";
import { FormValues } from "./schema";

type Props = {
  defaultValues: FormValues;
  onChange(formValues: FormValues): void;
};

export default function WidgetUrlGenerator({ defaultValues, onChange }: Props) {
  const methods = useForm<FormValues>({ defaultValues });
  const [query, setQuery] = useState(
    methods.formState.defaultValues!.endowIdName!.name
  );

  const hideAdvancedOptions = methods.watch("hideAdvancedOptions");

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

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-2 xl:w-full xl:max-w-md text-sm font-normal font-body"
        onSubmit={methods.handleSubmit(onChange)}
      >
        {/* ID from defaultValues is the URL param endow ID*/}
        {methods.formState.defaultValues!.endowIdName!.id === 0 && (
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
        )}

        <CheckField<FormValues> name="hideText">Hide text</CheckField>

        <span>Available currencies:</span>
        <DenomSelector />

        <CheckField<FormValues> name="hideAdvancedOptions">
          Hide "advanced options"
        </CheckField>

        <CheckField<FormValues>
          name="unfoldAdvancedOptions"
          disabled={hideAdvancedOptions}
          classes={{ label: "peer-disabled:text-gray" }}
        >
          Unfold "advanced options" by default
        </CheckField>

        <span>Define split value by default:</span>
        <Split<FormValues, "liquidPercentage", never>
          className="mb-6 xl:w-96"
          liqPctField="liquidPercentage"
        />

        <div className="flex gap-3 w-full max-xl:justify-center mt-8">
          <button
            type="reset"
            className="btn-outline-filled btn-donate max-sm:mx-auto w-40"
            onClick={() => methods.reset()}
          >
            Reset Changes
          </button>
          <button className="btn-orange btn-donate max-sm:mx-auto w-40">
            Update Snippet
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
