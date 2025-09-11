import type { UnSdgNum } from "@better-giving/schemas";
import { categories } from "constants/unsdgs";
import { useSearchParams } from "react-router";
import type { SDGGroup } from "types/lists";
import { toParsed, toRaw } from "../helpers";
import { FlatFilter } from "./common";

const groups = Object.entries(categories).map(
  ([group, val]) => [+group, val.sdgs] as [SDGGroup, UnSdgNum[]]
);

export default function Categories() {
  const [params, setParams] = useSearchParams();
  const { sdgs: psdgs = [], ...p } = toParsed(params);
  const activeGroups = groups
    .filter(([, sdgs]) => sdgs.every((sdg) => psdgs.includes(sdg)))
    .map(([g]) => g);

  return (
    <FlatFilter
      label="Categories"
      selectedValues={activeGroups}
      options={Object.entries(categories).map(([num, { name }]) => ({
        key: num,
        value: +num as SDGGroup,
        displayText: name,
      }))}
      onChange={(values) => {
        const n: UnSdgNum[] = [];
        for (const v of values) {
          n.push(...categories[v].sdgs);
        }
        setParams(toRaw({ ...p, sdgs: n }), {
          replace: true,
          preventScrollReset: true,
        });
      }}
    />
  );
}
