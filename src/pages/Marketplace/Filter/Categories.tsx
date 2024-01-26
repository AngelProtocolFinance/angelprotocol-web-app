import { categories } from "constants/unsdgs";
import { setSDGgroups } from "slices/components/marketFilter";
import { useGetter, useSetter } from "store/accessors";
import { SDGGroup } from "types/lists";
import { FlatFilter } from "./common";

export default function Categories() {
  const sdgGroups = useGetter(
    (state) => state.component.marketFilter.sdgGroups,
  );

  const dispatch = useSetter();

  return (
    <FlatFilter
      label="Categories"
      selectedValues={sdgGroups}
      options={Object.entries(categories).map(([num, { name }]) => ({
        key: num,
        value: +num as SDGGroup,
        displayText: name,
      }))}
      onChange={(value) => dispatch(setSDGgroups(value))}
    />
  );
}
