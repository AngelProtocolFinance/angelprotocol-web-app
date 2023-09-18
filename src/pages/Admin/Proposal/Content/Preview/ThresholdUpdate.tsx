import { ThresholdMeta } from "types/tx";
import KeyValue from "./common/KeyValue";
import PreviewContainer from "./common/PreviewContainer";

export default function ThresholdUpdate({
  curr,
  new: newThreshold,
}: ThresholdMeta) {
  return (
    <PreviewContainer>
      <KeyValue _key="current threshold">
        <span className="text-sm">{curr}</span>
      </KeyValue>
      <KeyValue _key="new threshold">
        <span className="text-sm">{newThreshold}</span>
      </KeyValue>
    </PreviewContainer>
  );
}
