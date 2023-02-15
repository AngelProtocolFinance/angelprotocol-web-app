import { useState } from "react";
import { EmbeddedBankMsg, EmbeddedWasmMsg, Proposal } from "types/contracts";
import Icon from "components/Icon";
import { DetailLabel } from "components/admin";
import Preview from "./Preview";

export default function Content(props: Proposal) {
  const [isRawBlocksShown, setIsRawBlockShown] = useState(false);

  function toggleRawMessage() {
    setIsRawBlockShown((prev) => !prev);
  }

  return (
    //follow Proposal layout
    <>
      {props.meta && (
        <>
          <DetailLabel classes="mb-2">content</DetailLabel>
          <Preview {...JSON.parse(props.meta)} />
        </>
      )}

      <DetailLabel classes="mt-4 mb-2">
        raw messages
        <button
          onClick={toggleRawMessage}
          className={`text-3xs ml-2 p-1 rounded-sm transition transform text-white ${
            isRawBlocksShown ? "bg-orange -rotate-90" : "bg-blue rotate-0"
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

function RawBlock(props: EmbeddedWasmMsg | EmbeddedBankMsg) {
  const isWASM = "wasm" in props;
  const codeString = isWASM
    ? JSON.stringify(JSON.parse(window.atob(props.wasm.execute.msg)), null, 2)
    : JSON.stringify(props, null, 2);

  return (
    <div className="grid rounded text-gray-d1 dark:text-gray border border-prim bg-orange-l6 dark:bg-blue-d7 p-3 mb-6 text-sm">
      <code className="font-mono whitespace-pre overflow-x-auto">
        {isWASM && <span>to contract: {props.wasm.execute.contract_addr}</span>}
        <br />
        {codeString}
      </code>
    </div>
  );
}
