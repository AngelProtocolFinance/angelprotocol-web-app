import { UNSDG_NUMS } from "types/lists";
import { useGetter, useSetter } from "store/accessors";
import { setSdgs } from "slices/components/marketFilter";
import { unsdgs } from "constants/unsdgs";
import { FilterOption, FlatFilter } from "./common";

const sdgsList: UNSDG_NUMS[] = Array(17)
  .fill(1)
  .map((i, x) => i + x);
const options: FilterOption<UNSDG_NUMS>[] = sdgsList.map((sdg) => ({
  displayText: `#${sdg}: ${unsdgs[sdg].title}`,
  value: sdg,
  key: `sdg-option-${sdg}`,
}));

export default function SDGs() {
  const sdgs = useGetter((state) => state.component.marketFilter.sdgs);
  const dispatch = useSetter();

  return (
    <FlatFilter
      label="UN SDGs"
      classes="grid grid-rows-2 grid-cols-2 gap-y-2"
      options={options}
      selectedValues={sdgs}
      onChange={(value) => dispatch(setSdgs(value))}
    />
  );
}
