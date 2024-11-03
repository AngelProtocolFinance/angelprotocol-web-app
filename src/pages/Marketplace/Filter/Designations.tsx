import type { EndowDesignation } from "@better-giving/endowment";
import { useMarketplaceContext } from "../Context";
import { type FilterOption, FlatFilter } from "./common";

const options: FilterOption<EndowDesignation>[] = [
  { displayText: "Charity", key: "charity", value: "Charity" },
  {
    displayText: "Religious Organization",
    key: "religious-organization",
    value: "Religious Organization",
  },
  { displayText: "University", key: "university", value: "University" },
  { displayText: "Hospital", key: "hospital", value: "Hospital" },
  { displayText: "Other", key: "other", value: "Other" },
];

export default function Designations() {
  const { state, update } = useMarketplaceContext();

  return (
    <FlatFilter
      label="NPO Type"
      selectedValues={state.endow_designation}
      options={options}
      onChange={(value) => update({ endow_designation: value })}
    />
  );
}
