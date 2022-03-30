import toCurrency from "helpers/toCurrency";
import { WithdrawMeta } from "pages/Admin/types";
import { PropsWithChildren } from "react";

export default function WithdrawPreview(props: WithdrawMeta) {
  return (
    <div className="bg-white bg-opacity-10 shadow-inner p-2 rounded-md mb-2 mt-1">
      {props.sourcesPreview.map((source) => (
        //map sources
        <KeyValue _key={`from ${source.vaultName}`}>
          <span>$ {toCurrency(props.totalAmount, 2)}</span>
        </KeyValue>
      ))}

      <KeyValue _key="total amount" _classes="border-t border-opacity-10 mt-2">
        <span>$ {toCurrency(props.totalAmount, 2)}</span>
      </KeyValue>
      <KeyValue _key="beneficiary">
        <span className="font-mono text-sm">{props.beneficiary}</span>
      </KeyValue>
    </div>
  );
}

function KeyValue({
  _key,
  _classes = "",
  children,
}: PropsWithChildren<{}> & { _key: string; _classes?: string }) {
  return (
    <p className={`flex items-baseline gap-2 ${_classes}`}>
      <span className="text-xs font-heading uppercase w-48">{_key}</span>
      {children}
    </p>
  );
}
