import { FormValues as FV } from "../types";
import { unsdgs } from "constants/unsdgs";
import { ErrorMessage, InputRow } from "../../../common";
import Selector from "../../../common/Selector";

const OPTIONS = Object.entries(unsdgs).map(([_key, val]) => ({
  label: `${+_key < 10 ? "0" : ""}${_key} - ${val.title.toUpperCase()}`,
  value: +_key,
}));

export default function UnSdgSelector({ classes = "" }: { classes?: string }) {
  return (
    <InputRow
      classes={classes}
      htmlFor="un_sdg"
      label="Which UN SDG is your org’s mission aligned with?"
    >
      <Selector<FV>
        classes={{ button: "px-2 py-1 text-sm", option: "px-2 py-1 text-sm" }}
        name="sdg"
        placeholder="Select an SDG"
        options={OPTIONS}
      />
      <ErrorMessage<FV> name="sdg" />
    </InputRow>
  );
}
