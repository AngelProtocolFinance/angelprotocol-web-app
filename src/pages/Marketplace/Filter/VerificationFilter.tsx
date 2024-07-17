import { useMarketplaceContext } from "../Context";
import { type FilterOption, FlatFilter } from "./common";

const options: FilterOption<boolean>[] = [
  { displayText: "Verified", value: true, key: "true" },
  { displayText: "Not verified", value: false, key: "false" },
];

export default function VerificationFilter() {
  const { state, update } = useMarketplaceContext();

  return (
    <FlatFilter
      label="Verification status"
      selectedValues={state.verified}
      options={options}
      onChange={(options) => update({ verified: options })}
    />
  );
}
