import { useState } from "react";
import { EmbeddedBankMsg, EmbeddedWasmMsg } from "types/contracts";
import { Transaction } from "types/contracts/multisig";
import Icon from "components/Icon";
import { DetailLabel } from "components/admin";
import Preview from "./Preview";

export default function Content(props: Transaction) {
  const [isRawBlocksShown, setIsRawBlockShown] = useState(true);
  const [isContentShown, setIsContentShown] = useState(false);
  function toggleRawMessage() {
    setIsRawBlockShown((prev) => !prev);
  }

  function toggleContentMessage() {
    setIsContentShown((prev) => !prev);
  }
  return (
    //follow Proposal layout
    <>
      {props.meta && (
        <>
          <DetailLabel>
            <button
              onClick={toggleContentMessage}
              className={`text-3xs mr-2 p-1 rounded-sm transition transform border border-prim`}
            >
              <Icon
                type={isContentShown ? "Dash" : "Plus"}
                className="w-6 h-6 "
              />
            </button>
            content
          </DetailLabel>
          {isContentShown && <Preview {...JSON.parse(props.meta)} />}
        </>
      )}

      <DetailLabel>
        <button
          onClick={toggleRawMessage}
          className={`text-3xs mr-2 p-1 rounded-sm transition transform border border-prim`}
        >
          <Icon
            type={isRawBlocksShown ? "Dash" : "Plus"}
            className="w-6 h-6 "
          />
        </button>
        raw messages
      </DetailLabel>
      {isRawBlocksShown ? "need data" : ""}
    </>
  );
}

export function RawBlock(props: EmbeddedWasmMsg | EmbeddedBankMsg) {
  const isWASM = "wasm" in props;
  const codeString = isWASM
    ? JSON.stringify(JSON.parse(window.atob(props.wasm.execute.msg)), null, 2)
    : JSON.stringify(props, null, 2);

  return (
    <div className="grid rounded-b-lg text-gray-d1 dark:text-white border border-prim bg-orange-l6 dark:bg-blue-d6 p-6 mb-6 text-sm">
      <code className="font-mono whitespace-pre overflow-x-auto">
        {isWASM && <span>to contract: {props.wasm.execute.contract_addr}</span>}
        <br />
        {codeString}
      </code>
    </div>
  );
}
