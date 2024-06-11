import { categories } from "constants/unsdgs";
import type { SDGGroup } from "types/lists";
import { useMarketplaceContext } from "../Context";
import { FlatFilter } from "./common";

export default function Categories() {
  const { state, update } = useMarketplaceContext();

  return (
    <FlatFilter
      label="Categories"
      selectedValues={state.sdgGroups}
      options={Object.entries(categories).map(([num, { name }]) => ({
        key: num,
        value: +num as SDGGroup,
        displayText: name,
      }))}
      onChange={(value) => update({ sdgGroups: value })}
    />
  );
}
