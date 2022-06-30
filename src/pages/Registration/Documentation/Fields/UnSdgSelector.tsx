import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { DocumentationValues } from "pages/Registration/types";
import Selector from "components/Selector";
import { unsdgs } from "constants/unsdgs";
import { InputRow } from "../../common";

const OPTIONS = Object.entries(unsdgs).map(([_key, val]) => ({
  label: `${+_key < 10 ? "0" : ""}${_key} - ${val.title.toUpperCase()}`,
  value: +_key,
}));

export default function UnSdgSelector() {
  const {
    control,
    formState: { errors, isSubmitting },
  } = useFormContext<DocumentationValues>();

  return (
    <InputRow
      htmlFor="un_sdg"
      label="Which UN SDG is your org’s mission aligned with?"
    >
      <Selector
        name="un_sdg"
        placeholder="[UN SDG]"
        options={OPTIONS}
        control={control}
        disabled={isSubmitting}
      />
      <ErrorMessage
        errors={errors}
        as="p"
        name="un_sdg"
        className="w-full text-xs text-failed-red text-center"
      />
    </InputRow>
  );
}
