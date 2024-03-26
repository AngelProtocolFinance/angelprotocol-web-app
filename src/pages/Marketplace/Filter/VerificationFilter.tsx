import { setVerified } from "slices/components/marketFilter";
import { useGetter, useSetter } from "store/accessors";
import { FilterOption, FlatFilter } from "./common";

const options: FilterOption<boolean>[] = [
  { displayText: "Verified", value: true, key: "true" },
  { displayText: "Not verified", value: false, key: "false" },
];

export default function VerificationFilter() {
  const verified = useGetter((state) => state.component.marketFilter.verified);
  const dispatch = useSetter();

  return (
    <FlatFilter
      label="Verification status"
      selectedValues={verified}
      options={options}
      onChange={(options) => dispatch(setVerified(options))}
    />
  );
}
