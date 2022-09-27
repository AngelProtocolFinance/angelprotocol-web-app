import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { DocumentationValues as DV } from "pages/Registration/types";
import { unsdgs } from "constants/unsdgs";
import { InputRow } from "../../common";
import Selector from "../../common/Selector";

const OPTIONS = Object.entries(unsdgs).map(([_key, val]) => ({
  label: `${+_key < 10 ? "0" : ""}${_key} - ${val.title.toUpperCase()}`,
  value: +_key,
}));

export default function UnSdgSelector() {
  const {
    formState: { errors },
  } = useFormContext<DV>();

  return (
    <InputRow
      htmlFor="un_sdg"
      label="Which UN SDG is your org’s mission aligned with?"
    >
      <Selector<DV>
        name="un_sdg"
        placeholder="Select an SDG"
        options={OPTIONS}
      />
      <ErrorMessage
        errors={errors}
        as="p"
        name="un_sdg"
        className="w-full text-xs text-red text-center"
      />
    </InputRow>
  );
}
