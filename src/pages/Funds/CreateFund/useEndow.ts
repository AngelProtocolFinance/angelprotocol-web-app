import { logger } from "helpers";
import { useEffect, useState } from "react";
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

  const [endow, setEndow] = useState<Endow | "loading" | "error">();

  const configSource = `${members.at(0)?.id ?? 0}-${members.length}` as const;

  useEffect(() => {
    (async () => {
      try {
        setEndow(undefined);
        const [id, length] = configSource.split("-");
        const numId = +id;
        const numLength = +length;

        if (numId === 0 || numLength === 0) return;
        if (numLength > 1) return setEndow(undefined);

        setEndow("loading");
        const { hide_bg_tip, splitLiqPct, name } = await getEndow(
          {
            id: numId,
            fields: ["hide_bg_tip", "splitLiqPct", "name"],
          },
          true
        ).unwrap();
        onEndowSet({ hide_bg_tip, splitLiqPct, name });
        setEndow({ hide_bg_tip, splitLiqPct, name });
      } catch (err) {
        setEndow("error");
        logger.error(err);
      }
    })();
  }, [configSource, onEndowSet, getEndow]);

  return endow;
}
