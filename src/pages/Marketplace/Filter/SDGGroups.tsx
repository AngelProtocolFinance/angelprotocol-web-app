import { useMemo } from "react";
import { UNSDG_NUMS } from "types/lists";
import { useGetter, useSetter } from "store/accessors";
import { SDG_GROUPS, setSdgs } from "slices/components/marketFilter";
import { unsdgs } from "constants/unsdgs";
import { GroupProps, MultilevelFilter } from "./common";

export default function SDGGroups() {
  const sdgs = useGetter((state) => state.component.marketFilter.sdgGroups);
  const dispatch = useSetter();

  const groups: GroupProps<UNSDG_NUMS>[] = useMemo(() => {
    const result: GroupProps<UNSDG_NUMS>[] = SDG_GROUPS.map((group) => {
      const groupProps: GroupProps<UNSDG_NUMS> = {
        key: group.key,
        label: group.label,
        selectedValues: sdgs[group.key],
        options: group.options.map((sdg) => ({
          displayText: `SDG #${sdg} : ${unsdgs[sdg].title}`,
          value: sdg,
          key: `sdg-option-${group.key}-${sdg}`,
        })),
        onChange: (options) =>
          dispatch(setSdgs({ group: group.key, sdgs: options })),
      };

      return groupProps;
    });

    return result;
  }, [sdgs, dispatch]);

  return <MultilevelFilter label="SDG Group" groups={groups} />;
}
