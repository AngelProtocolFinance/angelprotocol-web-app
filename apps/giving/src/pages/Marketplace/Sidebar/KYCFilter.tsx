import { setKYCOnly } from "@ap/slices/market-filter";
import { useGetter, useSetter } from "@ap/store";
import { FilterOption, FlatFilter } from "./common";

const options: FilterOption<boolean>[] = [
  { displayText: "Required", value: true, key: "true" },
  { displayText: "Not Required", value: false, key: "false" },
];

export default function KYCFilter() {
  const kycOnly = useGetter((state) => state.marketFilter.kyc_only);
  const dispatch = useSetter();

  return (
    <FlatFilter
      label="Donor verification"
      selectedValues={kycOnly}
      options={options}
      onChange={(options) => dispatch(setKYCOnly(options))}
    />
  );
}
