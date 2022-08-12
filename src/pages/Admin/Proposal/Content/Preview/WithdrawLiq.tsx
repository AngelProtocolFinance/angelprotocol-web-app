import { WithdrawLiqMeta } from "pages/Admin/types";
import KeyValue from "./common/KeyValue";
import PreviewContainer from "./common/PreviewContainer";

export default function WithdrawLiq(props: WithdrawLiqMeta["data"]) {
  return (
    <PreviewContainer>
      <KeyValue _key="beneficiary">
        <span className="font-mono text-sm">{props.beneficiary}</span>
      </KeyValue>
    </PreviewContainer>
  );
}
