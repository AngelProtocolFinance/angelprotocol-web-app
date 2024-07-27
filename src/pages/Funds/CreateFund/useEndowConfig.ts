import { logger } from "helpers";
import { useEffect, useState } from "react";
import { useLazyProfileQuery } from "services/aws/aws";
import type { Endowment } from "types/aws";
import type { FundMember } from "./types";

export type EndowConfig = Pick<Endowment, "splitLiqPct" | "hide_bg_tip">;

export function useEndowConfig(
  members: FundMember[],
  onConfigSet: (config: EndowConfig) => void
) {
  /** set donate settings for single endowment */
  const [getEndow] = useLazyProfileQuery();

  const [config, setConfig] = useState<EndowConfig | "loading" | "error">();

  const configSource = `${members.at(0)?.id ?? 0}-${members.length}` as const;

  useEffect(() => {
    (async () => {
      try {
        setConfig(undefined);
        const [id, length] = configSource.split("-");
        const numId = +id;
        const numLength = +length;

        if (numId === 0 || numLength === 0) return;
        if (numLength > 1) return setConfig(undefined);

        setConfig("loading");
        const { hide_bg_tip, splitLiqPct } = await getEndow(
          {
            id: numId,
            fields: ["hide_bg_tip", "splitLiqPct"],
          },
          true
        ).unwrap();
        onConfigSet({ hide_bg_tip, splitLiqPct });
        setConfig({ hide_bg_tip, splitLiqPct });
      } catch (err) {
        setConfig("error");
        logger.error(err);
      }
    })();
  }, [configSource, onConfigSet, getEndow]);

  return config;
}
