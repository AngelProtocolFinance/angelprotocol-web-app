import Icon from "components/Icons/Icons";
import { EmbeddedWasmMsg } from "contracts/types";
import { useState } from "react";
import { Proposal } from "services/terra/admin/types";
import DetailLabel from "../DetailLabel";
import TxPreview from "./TxPreview";

export default function ProposalContent(props: Proposal) {
  const [isRawBlocksShown, setIsRawBlockShown] = useState(false);

  function toggleRawMessage() {
    setIsRawBlockShown((prev) => !prev);
  }

  return (
    //follow Proposal layout
    <>
      {props.meta && (
        <>
          <DetailLabel>content</DetailLabel>
          <TxPreview {...JSON.parse(props.meta || "{}")} />
        </>
      )}

      <DetailLabel>
        raw messages
        <button
          onClick={toggleRawMessage}
          className={`text-2xs font-normal font-mono ml-1 p-1 rounded-sm transition transform ${
            isRawBlocksShown
              ? "bg-angel-orange -rotate-90"
              : "bg-angel-blue rotate-0"
          }`}
        >
          <Icon type="CaretLeft" />
        </button>
      </DetailLabel>

      {isRawBlocksShown &&
        props.msgs.map((msg, i) => <RawBlock key={i} {...msg} />)}
    </>
  );
}

function RawBlock(props: EmbeddedWasmMsg) {
  return (
    <div className="bg-white/10 shadow-inner rounded-md p-2 my-2 text-sm">
      <code className="font-mono whitespace-pre">
        <span>to contract: {props.wasm.execute.contract_addr}</span>
        <br />
        {JSON.stringify(JSON.parse(atob(props.wasm.execute.msg)), null, 2)}
      </code>
    </div>
  );
}
