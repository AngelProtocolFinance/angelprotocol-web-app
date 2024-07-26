import { logger } from "helpers";
import { useEffect, useState } from "react";
import { useLazyProfileQuery } from "services/aws/aws";
import type { Endowment } from "types/aws";
import type { FundMember } from "./types";

export function useSingleEndowSetting(members: FundMember[]) {
  /** set donate settings for single endowment */
  const [getEndow] = useLazyProfileQuery();

  type SingleEndowSetting = Pick<Endowment, "splitLiqPct" | "hide_bg_tip">;

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
        if (numLength > 1) return;

        setSingleMemberSetting("loading");
        const { hide_bg_tip, splitLiqPct } = await getEndow({
          id: numId,
          fields: ["hide_bg_tip", "splitLiqPct"],
        }).unwrap();
        setSingleMemberSetting({ hide_bg_tip, splitLiqPct });
      } catch (err) {
        setSingleMemberSetting("error");
        logger.error(err);
      }
    })();
  }, [endowSettingSource]);

  return singleMemberSetting;
}
