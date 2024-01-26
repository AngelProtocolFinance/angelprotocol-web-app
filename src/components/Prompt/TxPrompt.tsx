import ExtLink from "components/ExtLink";
import { useModalContext } from "contexts/ModalContext";
import { getTxUrl } from "helpers";
import { useNavigate } from "react-router-dom";
import { TxState, isTxError, isTxLoading, isTxSuccess } from "types/tx";
import Prompt from "./Prompt";
import { Props as PromptProps } from "./types";

export function TxPrompt(props: TxState) {
  const { closeModal } = useModalContext();
  const navigate = useNavigate();
  const { message, ...rest } = toPrompt(props);
  return (
    <Prompt {...rest}>
      <p>{message}</p>
      {isTxSuccess(props) && props.success.link && (
        <button
          onClick={() => {
            navigate(props.success.link?.url);
            closeModal();
          }}
          className="inline-block justify-self-center bg-blue uppercase text-xs py-1 px-2 text-white rounded mt-4"
        >
          {props.success.link.description}
        </button>
      )}
      {(isTxError(props) || isTxSuccess(props)) && props.tx && (
        <ExtLink
          href={getTxUrl(props.tx.chainID, props.tx.hash)}
          className="text-blue dark:text-blue-l2 text-xs block mt-4 uppercase hover:text-blue-l2 hover:dark:text-orange-l2"
        >
          transaction details
        </ExtLink>
      )}
    </Prompt>
  );
}

function toPrompt(props: TxState): PromptProps & { message: string } {
  if (isTxLoading(props)) {
    return {
      type: "loading",
      headline: "Transaction",
      message: props.loading,
    };
  }
  if (isTxError(props)) {
    return { type: "error", headline: "Transaction", message: props.error };
  }
  return {
    type: "success",
    headline: "Transaction",
    message: props.success.message,
  };
}
