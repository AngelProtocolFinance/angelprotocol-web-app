import { CheckField } from "components/form";
import { FV } from "./types";

export default function HideBGTipCheckbox() {
  return (
    <div className="grid gap-2 text-sm">
      <span>
        During the donation flow, there is a step in which users can choose to
        tip us any amount they desire alongside their donation to you - the
        amount they tip will not affect the donation amount you receive. You may
        choose to turn this step off in the donation flow by ticking the
        checkbox below and we will instead apply a fixed 1.5% fee to any
        donation amount you receive.
      </span>
      <CheckField<FV> name="hide_bg_tip">
        Opt out of tip-based donations
      </CheckField>
    </div>
  );
}
