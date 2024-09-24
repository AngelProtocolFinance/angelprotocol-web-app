import { CheckField } from "components/form";
import type { FV } from "./types";

export default function HideBGTipCheckbox() {
  return (
    <div className="grid gap-2">
      <CheckField<FV> name="hide_bg_tip" classes="font-medium">
        Opt out of Support Contribution Model
      </CheckField>
      <span className="text-xs sm:text-sm italic text-navy-l1">
        During the donation flow, there is a step in which users can choose to
        support Better Giving by contributing any amount they desire alongside
        their donation to you - the amount they contribute will not affect the
        donation amount you receive. You may choose to turn this step off in the
        donation flow by ticking the checkbox above and we will instead apply a
        fixed 1.5% fee to any donation amount you receive.
      </span>
    </div>
  );
}
