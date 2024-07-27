import { useEffect } from "react";
import { useLazyProfileQuery } from "services/aws/aws";
import type { Endowment } from "types/aws";
import type { FundMember } from "./types";

export type Endow = Pick<Endowment, "splitLiqPct" | "hide_bg_tip" | "name">;

export function useEndow(
  members: FundMember[],
  onEndowSet: (endow: Endow) => void
) {
  /** set donate settings for single endowment */
  const [getEndow] = useLazyProfileQuery();
  const configSource = `${members.at(0)?.id ?? 0}-${members.length}` as const;

  useEffect(() => {
    const [id, length] = configSource.split("-");
    const numId = +id;
    const numLength = +length;

    if (numId === 0 || numLength === 0) return;
    if (numLength > 1) return;

    getEndow(
      {
        id: numId,
        fields: ["hide_bg_tip", "splitLiqPct", "name"],
      },
      true
    )
      .unwrap()
      .then(({ hide_bg_tip, splitLiqPct, name }) => {
        onEndowSet({
          hide_bg_tip,
          splitLiqPct,
          name,
        });
      });
  }, [configSource, onEndowSet, getEndow]);
}
