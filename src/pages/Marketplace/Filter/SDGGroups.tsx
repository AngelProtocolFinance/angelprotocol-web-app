import { UNSDG_NUMS } from "types/lists";
import { useGetter, useSetter } from "store/accessors";
import { setSdgs } from "slices/components/marketFilter";
import { unsdgs } from "constants/unsdgs";
import { FlatFilter } from "./common";

export default function SDGGroups() {
  const sdgs = useGetter((state) => state.component.marketFilter.sdgs);
  const dispatch = useSetter();

  return (
    <FlatFilter
      label="SDGs"
      selectedValues={sdgs}
      options={Object.entries(unsdgs).map(([sdgNum, { title }]) => ({
        value: +sdgNum as UNSDG_NUMS,
        displayText: `${sdgNum} : ${title}`,
      }))}
      onChange={(value) => dispatch(setSdgs(value))}
    />
  );
}
