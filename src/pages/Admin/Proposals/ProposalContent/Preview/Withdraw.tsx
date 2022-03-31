import toCurrency from "helpers/toCurrency";
import { WithdrawMeta } from "pages/Admin/types";
import KeyValue from "./preview-components/KeyValue";

export default function WithdrawPreview(props: WithdrawMeta) {
  return (
    <div className="bg-white/10 shadow-inner p-2 rounded-md mb-2 mt-1">
      {props.sourcesPreview.map((source) => (
        //map sources
        <KeyValue _key={`from ${source.vaultName}`}>
          <span>$ {toCurrency(props.totalAmount, 2)}</span>
        </KeyValue>
      ))}

      <KeyValue _key="total amount" _classes="border-t border-white/10 mt-2">
        <span>$ {toCurrency(props.totalAmount, 2)}</span>
      </KeyValue>
      <KeyValue _key="beneficiary">
        <span className="font-mono text-sm">{props.beneficiary}</span>
      </KeyValue>
    </div>
  );
}
