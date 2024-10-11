import { useSearchParams } from "react-router-dom";
import { toParsed, toRaw } from "../helpers";
import { type FilterOption, FlatFilter } from "./common";

const options: FilterOption<boolean>[] = [
  { displayText: "Required", value: true, key: "true" },
  { displayText: "Not Required", value: false, key: "false" },
];

export default function KYCFilter() {
  const [params, setParams] = useSearchParams();
  const { kyc_only: pkycs = [], ...p } = toParsed(params);

  return (
    <FlatFilter
      label="Donor verification"
      selectedValues={pkycs}
      options={options}
      onChange={(options) => {
        setParams(
          toRaw({
            ...p,
            kyc_only: options,
          }),
          { replace: true, preventScrollReset: true }
        );
      }}
    />
  );
}
