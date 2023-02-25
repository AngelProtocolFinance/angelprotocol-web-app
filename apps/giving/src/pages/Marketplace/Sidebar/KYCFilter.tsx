import { setKYCOnly } from "@giving/slices/components/marketFilter";
import { useGetter, useSetter } from "@giving/store";
import { FilterOption, FlatFilter } from "./common";

const options: FilterOption<boolean>[] = [
  { displayText: "Required", value: true, key: "true" },
  { displayText: "Not Required", value: false, key: "false" },
];

export default function KYCFilter() {
  const kycOnly = useGetter((state) => state.component.marketFilter.kyc_only);
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
