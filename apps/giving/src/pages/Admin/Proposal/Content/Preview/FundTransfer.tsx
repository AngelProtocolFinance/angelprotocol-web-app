import { symbols } from "@giving/constants/tokens";
import { humanize } from "@giving/helpers";
import { FundSendMeta } from "@giving/types/pages/admin";
import KeyValue from "./common/KeyValue";
import PreviewContainer from "./common/PreviewContainer";

export default function FundTransfer(props: FundSendMeta["data"]) {
  return (
    <PreviewContainer>
      <KeyValue _key="from">
        <span className="uppercase text-xs font-heading">
          admin group contract
        </span>
      </KeyValue>
      <KeyValue _key="total amount" _classes="border-t border-prim mt-2">
        <span>
          {humanize(props.amount, 3)} {symbols[props.denom]}
        </span>
      </KeyValue>
      <KeyValue _key="recipient">
        <span className="text-sm">{props.recipient}</span>
      </KeyValue>
    </PreviewContainer>
  );
}
