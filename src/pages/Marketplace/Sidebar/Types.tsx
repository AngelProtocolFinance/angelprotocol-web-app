import { CapitalizedEndowmentType } from "types/contracts";
import { useGetter, useSetter } from "store/accessors";
import { setTypes } from "slices/components/marketFilter";
import { FlatList } from "./common";

type Option = {
  key: CapitalizedEndowmentType;
  value: CapitalizedEndowmentType;
  displayText: string;
};

const options: Option[] = [
  { displayText: "Registered Non-Profit", key: "Charity", value: "Charity" },
  { displayText: "Impact For-Profit", key: "Normal", value: "Normal" },
  // { displayText: "Impact Crowdfunding", key: "ic", value: "ic" },
];

export default function Types() {
  const { types } = useGetter((state) => state.component.marketFilter);
  const dispatch = useSetter();

  return (
    <FlatList
      selectedValues={types}
      options={options}
      onChange={(types) => dispatch(setTypes(types))}
    />
  );
}
