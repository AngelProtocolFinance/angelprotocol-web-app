import { useSearchParams } from "react-router-dom";
import type { EndowDesignation } from "types/aws";
import { toParsed, toRaw } from "../helpers";
import { type FilterOption, FlatFilter } from "./common";

const options: FilterOption<EndowDesignation>[] = [
  { displayText: "Charity", key: "charity", value: "Charity" },
  {
    displayText: "Religious Organization",
    key: "religious-organization",
    value: "Religious Organization",
  },
  { displayText: "University", key: "university", value: "University" },
  { displayText: "Hospital", key: "hospital", value: "Hospital" },
  { displayText: "Other", key: "other", value: "Other" },
];

export default function Designations() {
  const [params, setParams] = useSearchParams();
  const { endow_designation: pEndowDesignation = [], ...p } = toParsed(params);

  return (
    <FlatFilter
      label="NPO Type"
      selectedValues={pEndowDesignation}
      options={options}
      onChange={(value) => {
        setParams(toRaw({ ...p, endow_designation: value }), { replace: true });
      }}
    />
  );
}
