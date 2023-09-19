import { useGetter, useSetter } from "store/accessors";
import { setKYCOnly } from "slices/components/marketFilter";
import { PAYMENT_WORDS, titleCase } from "constant/common";
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
      label={`${titleCase(PAYMENT_WORDS.payer)} verification`}
      selectedValues={kycOnly}
      options={options}
      onChange={(options) => dispatch(setKYCOnly(options))}
    />
  );
}
