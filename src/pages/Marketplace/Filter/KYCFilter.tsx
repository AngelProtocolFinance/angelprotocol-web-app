import { useMarketplaceContext } from "../Context";
import { type FilterOption, FlatFilter } from "./common";

const options: FilterOption<boolean>[] = [
  { displayText: "Required", value: true, key: "true" },
  { displayText: "Not Required", value: false, key: "false" },
];

export default function KYCFilter() {
  const { state, update } = useMarketplaceContext();

  return (
    <FlatFilter
      label="Donor verification"
      selectedValues={state.kyc_only}
      options={options}
      onChange={(options) => update({ kyc_only: options })}
    />
  );
}
