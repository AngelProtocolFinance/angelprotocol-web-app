import { Link } from "react-router-dom";
import { Props as PromptProps } from "./types";
import ExtLink from "components/ExtLink";
import {
  TxState,
  isError,
  isLoading,
  isSuccess,
} from "hooks/useCosmosTxSender";
import { getTxUrl } from "helpers";
import Prompt from "./Prompt";

export function TxPrompt(props: TxState) {
  const { message, ...rest } = toPrompt(props);
  return (
    <Prompt {...rest}>
      <p>{message}</p>
      {isSuccess(props) && props.success.link && (
        <>
          <Link
            to={props.success.link.url}
            className="inline-block justify-self-center bg-blue uppercase text-xs py-1 px-2 text-white rounded mt-4"
          >
            {props.success.link.description}
          </Link>
        </>
      )}
      {(isError(props) || isSuccess(props)) && props.tx && (
        <>
          <ExtLink
            href={getTxUrl(props.tx.chainID, props.tx.hash)}
            className="text-blue dark:text-blue-l2 text-xs block mt-4 uppercase hover:text-blue-l2 hover:dark:text-orange-l2"
          >
            transaction details
          </ExtLink>
        </>
      )}
    </Prompt>
  );
}

function toPrompt(props: TxState): PromptProps & { message: string } {
  if (isLoading(props)) {
    return {
      type: "loading",
      headline: "Transaction",
      message: props.loading,
    };
  } else if (isError(props)) {
    return { type: "error", headline: "Transaction", message: props.error };
  } else {
    return {
      type: "success",
      headline: "Transaction",
      message: props.success.message,
    };
  }
}
