import { setTypes } from "@giving/slices/components/marketFilter";
import { useGetter, useSetter } from "@giving/store";
import { CapitalizedEndowmentType } from "@giving/types/contracts";
import { FilterOption, FlatFilter } from "./common";

const options: FilterOption<CapitalizedEndowmentType>[] = [
  { displayText: "Registered Non-Profit", key: "Charity", value: "Charity" },
  { displayText: "Impact For-Profit", key: "Normal", value: "Normal" },
  // { displayText: "Impact Crowdfunding", key: "ic", value: "ic" },
];

export default function Types() {
  const { endow_types: types } = useGetter(
    (state) => state.component.marketFilter
  );
  const dispatch = useSetter();

  return (
    <FlatFilter
      label="Type"
      selectedValues={types}
      options={options}
      onChange={(types) => dispatch(setTypes(types))}
    />
  );
}
