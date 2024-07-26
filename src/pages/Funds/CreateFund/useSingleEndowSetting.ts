import { logger } from "helpers";
import { useEffect, useState } from "react";
import { useLazyProfileQuery } from "services/aws/aws";
import type { Endowment } from "types/aws";
import type { FundMember } from "./types";

export type SingleEndowSetting = Pick<Endowment, "splitLiqPct" | "hide_bg_tip">;

export function useSingleEndowSetting(
  members: FundMember[],
  onSettingsReceived: (settings: SingleEndowSetting) => void
) {
  /** set donate settings for single endowment */
  const [getEndow] = useLazyProfileQuery();

  const [singleMemberSetting, setSingleMemberSetting] = useState<
    SingleEndowSetting | "loading" | "error"
  >();
  const endowSettingSource = `${members.at(0)?.id ?? 0}-${
    members.length
  }` as const;

  useEffect(() => {
    (async () => {
      try {
        setSingleMemberSetting(undefined);
        const [id, length] = endowSettingSource.split("-");
        const numId = +id;
        const numLength = +length;

        if (numId === 0) return;
        if (numLength === 0) return;
        if (numLength > 1) return setSingleMemberSetting(undefined);

        setSingleMemberSetting("loading");
        const { hide_bg_tip, splitLiqPct } = await getEndow(
          {
            id: numId,
            fields: ["hide_bg_tip", "splitLiqPct"],
          },
          true
        ).unwrap();
        onSettingsReceived({ hide_bg_tip, splitLiqPct });
        setSingleMemberSetting({ hide_bg_tip, splitLiqPct });
      } catch (err) {
        setSingleMemberSetting("error");
        logger.error(err);
      }
    })();
  }, [endowSettingSource, onSettingsReceived]);

  return singleMemberSetting;
}
