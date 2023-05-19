import { TransferMeta } from "contracts/createTx/meta";
import { humanize } from "helpers";
import KeyValue from "./common/KeyValue";
import PreviewContainer from "./common/PreviewContainer";

export default function FundTransfer({ to, token }: TransferMeta) {
  return (
    <PreviewContainer>
      <KeyValue _key="from">
        <span className="uppercase text-xs font-heading">multisig wallet</span>
      </KeyValue>
      <KeyValue _key="total amount" _classes="border-t border-prim mt-2">
        <span>
          {humanize(token.amount, 3)} {token.symbol}
        </span>
      </KeyValue>
      <KeyValue _key="recipient">
        <span className="text-sm">{to}</span>
      </KeyValue>
    </PreviewContainer>
  );
}
