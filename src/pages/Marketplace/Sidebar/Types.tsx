import { CapitalizedEndowmentType } from "types/contracts";
import { useGetter, useSetter } from "store/accessors";
import { setTypes } from "slices/components/marketFilter";
import { FlatFilter, FlatListOption } from "./common";

const options: FlatListOption<CapitalizedEndowmentType>[] = [
  { displayText: "Registered Non-Profit", key: "Charity", value: "Charity" },
  { displayText: "Impact For-Profit", key: "Normal", value: "Normal" },
  // { displayText: "Impact Crowdfunding", key: "ic", value: "ic" },
];

export default function Types() {
  const { types } = useGetter((state) => state.component.marketFilter);
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
