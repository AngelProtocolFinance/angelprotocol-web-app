import { EndowDesignation } from "types/aws";
import { useGetter, useSetter } from "store/accessors";
import { setDesignations } from "slices/components/marketFilter";
import { FilterOption, FlatFilter } from "./common";

const options: FilterOption<EndowDesignation>[] = [
  { displayText: "Non-Profit", key: "non-profit", value: "Non-Profit" },
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
      label="Designation"
      selectedValues={designations}
      options={options}
      onChange={(value) => dispatch(setDesignations(value))}
    />
  );
}
