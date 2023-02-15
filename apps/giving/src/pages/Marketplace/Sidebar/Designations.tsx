import { EndowDesignation } from "types/aws";
import { useGetter, useSetter } from "store/accessors";
import { setDesignations } from "slices/components/marketFilter";
import { FilterOption, FlatFilter } from "./common";

const options: FilterOption<EndowDesignation>[] = [
  { displayText: "Non-Profit", key: "non-profit", value: "Non-Profit" },
  {
    displayText: "Religious Non-Profit",
    key: "religious-non-profit",
    value: "Religious Non-Profit",
  },
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
