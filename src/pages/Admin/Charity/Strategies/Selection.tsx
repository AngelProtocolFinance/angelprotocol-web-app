import { FieldArrayWithId, UseFieldArrayAppend } from "react-hook-form";
import { AccountStrategies } from "types/contracts";
import Icon from "components/Icon";
import { StrategyFormValues } from "./schema";

export const strategies: AccountStrategies = {
  locked: [
    { vault: "a", percentage: "0.5" },
    { vault: "b", percentage: "0.5" },
    { vault: "c", percentage: "0.5" },
  ],
  liquid: [
    { vault: "a", percentage: "0.5" },
    { vault: "b", percentage: "0.5" },
    { vault: "c", percentage: "0.5" },
  ],
};

type Props = {
  select: UseFieldArrayAppend<StrategyFormValues, "allocations">;
  selected: FieldArrayWithId<StrategyFormValues, "allocations", "id">[];
};

export default function Selection({ selected, select }: Props) {
  return (
    <div className="flex gap-4 p-4 border-2 border-zinc-50/20 rounded-md">
      {strategies.liquid.map(({ vault, percentage }) => {
        const isSelected = selected.some((s) => s.vault === vault);
        return (
          <div
            key={vault}
            className="flex gap-2 p-2 items-center relative text-zinc-50/80 font-heading"
          >
            <Icon type="Safe" size={36} />
            <span className="uppercase text-2xl font-extrabold">{vault}</span>
            <button
              disabled={isSelected}
              type="button"
              className="disabled:text-emerald-400"
              onClick={() => {
                select({ percentage: +percentage, vault });
              }}
            >
              {/**   TODO: better way to determine if vault is selected */}
              <Icon type={isSelected ? "CheckCircle" : "Plus"} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
