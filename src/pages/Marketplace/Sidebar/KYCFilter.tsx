import { useGetter, useSetter } from "store/accessors";
import { setKYCOnly } from "slices/components/marketFilter";
import { FlatFilter, FlatListOption } from "./common";

const options: FlatListOption<boolean>[] = [
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
