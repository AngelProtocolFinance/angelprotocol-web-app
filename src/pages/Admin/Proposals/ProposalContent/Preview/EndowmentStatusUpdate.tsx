import { EndowmentStatusMeta } from "pages/Admin/types";
import {
  EndowmentStatus,
  EndowmentStatusNum,
} from "services/terra/registrar/types";
import KeyValue from "./preview-components/KeyValue";

export default function EndowmentStatusUpdate(props: EndowmentStatusMeta) {
  return (
    <div className="bg-white/10 shadow-inner p-2 rounded-md mb-2 mt-1">
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
          <span className="font-mono text-sm">{props.beneficiary}</span>
        </KeyValue>
      )}
    </div>
  );
}

const statusText: { [key in EndowmentStatusNum]: keyof EndowmentStatus } = {
  0: "Inactive",
  1: "Approved",
  2: "Frozen",
  3: "Closed",
};
