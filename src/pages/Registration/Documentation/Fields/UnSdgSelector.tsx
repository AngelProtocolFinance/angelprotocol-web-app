import Selector from "components/Selector";
import { unsdgs } from "constants/unsdgs";
import { useFormContext } from "react-hook-form";
import { FormValues } from "../types";
import InputRow from "./InputRow";

const OPTIONS = Object.entries(unsdgs).map(([_key, val]) => ({
  label: `${+_key < 10 ? "0" : ""}${_key} - ${val.title.toUpperCase()}`,
  value: _key,
}));

export default function UnSdgSelector() {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext<FormValues>();

  return (
    <InputRow
      id="un_sdg"
      label="Which UN SDG is your org’s mission aligned with?"
    >
      <Selector
        name="un_sdg"
        placeholder="[UN SDG]"
        options={OPTIONS}
        control={control}
        disabled={isSubmitting}
      />
    </InputRow>
  );
}
