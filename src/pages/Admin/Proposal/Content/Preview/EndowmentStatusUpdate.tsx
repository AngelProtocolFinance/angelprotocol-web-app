import { EndowmentStatusMeta } from "pages/Admin/types";
import { EndowmentStatus, EndowmentStatusNum } from "types/contracts";
import KeyValue from "./common/KeyValue";
import PreviewContainer from "./common/PreviewContainer";

export default function EndowmentStatusUpdate(
  props: EndowmentStatusMeta["data"]
) {
  return (
    <PreviewContainer>
      <KeyValue _key="previous status">
        <span className="uppercase font-heading font-bold">
          {props.fromStatus}
        </span>
      </KeyValue>
      <KeyValue _key="proposed status">
        <span className="uppercase font-heading font-bold">
          {statusText[props.toStatus]}
        </span>
      </KeyValue>
      {props.beneficiary && (
        <KeyValue _key="beneficiary">
          <span className="text-sm">{props.beneficiary}</span>
        </KeyValue>
      )}
    </PreviewContainer>
  );
}

const statusText: { [key in EndowmentStatusNum]: keyof EndowmentStatus } = {
  0: "Inactive",
  1: "Approved",
  2: "Frozen",
  3: "Closed",
};
