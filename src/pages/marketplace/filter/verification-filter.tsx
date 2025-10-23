import { useSearchParams } from "react-router";
import { toParsed, toRaw } from "../helpers";
import { type FilterOption, FlatFilter } from "./common";

const options: FilterOption<boolean>[] = [
  { displayText: "Verified", value: true, key: "true" },
  { displayText: "Not verified", value: false, key: "false" },
];

export function VerificationFilter() {
  const [params, setParams] = useSearchParams();
  const { claimed: pc = [], ...p } = toParsed(params);

  return (
    <FlatFilter
      label="Verification status"
      selectedValues={pc}
      options={options}
      onChange={(options) => {
        setParams(toRaw({ ...p, claimed: options }), {
          replace: true,
          preventScrollReset: true,
        });
      }}
    />
  );
}
