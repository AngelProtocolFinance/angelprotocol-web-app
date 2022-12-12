import { useMemo } from "react";
import { UNSDG_NUMS } from "types/lists";
import { useGetter, useSetter } from "store/accessors";
import { setSdgs } from "slices/components/marketFilter";
import { unsdgs } from "constants/unsdgs";
import { GroupProps, MultilevelFilter } from "./common";

export default function SDGGroups() {
  const { sdgs } = useGetter((state) => state.component.marketFilter);
  const dispatch = useSetter();

  const groups: GroupProps<UNSDG_NUMS>[] = useMemo(() => {
    const result: GroupProps<UNSDG_NUMS>[] = GROUP_DATA.map((group) => {
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

  return (
    <MultilevelFilter label="SDG Group" groups={groups} hideBottomBorder />
  );
}

const GROUP_DATA: {
  key: number;
  label: string;
  options: UNSDG_NUMS[];
}[] = [
  {
    key: 1,
    label: "Reducing overall inequality",
    options: [1, 2, 10],
  },
  {
    key: 2,
    label: "Access to safe conditions",
    options: [3, 6, 7],
  },
  {
    key: 3,
    label: "Sustainable growth",
    options: [8, 9, 16],
  },
  {
    key: 4,
    label: "Equality through education",
    options: [4, 5],
  },
  {
    key: 5,
    label: "Sustainable partnerships",
    options: [11, 12, 17],
  },
  {
    key: 6,
    label: "Holistic climate action",
    options: [13, 14, 15],
  },
];
