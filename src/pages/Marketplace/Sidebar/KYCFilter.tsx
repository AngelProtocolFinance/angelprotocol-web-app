import { useGetter, useSetter } from "store/accessors";
import { setKYCOnly } from "slices/components/marketFilter";
import { FilterOption, FlatFilter } from "./common";

const options: FilterOption<boolean>[] = [
  { displayText: "Required", value: true, key: "true" },
  { displayText: "Not Required", value: false, key: "false" },
];

export default function KYCFilter() {
  const isKYCOnly = useGetter((state) => state.component.marketFilter.kycOnly);
  const dispatch = useSetter();

  return (
    <FlatFilter
      label="Donor verification"
      selectedValues={[isKYCOnly]}
      options={options}
      onChange={() => dispatch(setKYCOnly(!isKYCOnly))}
    />
  );
}
