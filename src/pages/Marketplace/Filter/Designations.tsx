import { setDesignations } from "slices/components/marketFilter";
import { useGetter, useSetter } from "store/accessors";
import type { EndowDesignation } from "types/aws";
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
  const designations = useGetter(
    (state) => state.component.marketFilter.endow_designation
  );
  const dispatch = useSetter();

  return (
    <FlatFilter
      label="NPO Type"
      selectedValues={designations}
      options={options}
      onChange={(value) => dispatch(setDesignations(value))}
    />
  );
}
