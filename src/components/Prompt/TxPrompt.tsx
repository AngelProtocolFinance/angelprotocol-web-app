import { Link } from "react-router-dom";
import { Props as PromptProps } from "./types";
import ExtLink from "components/ExtLink";
import {
  TxState,
  isError,
  isLoading,
  isSuccess,
} from "hooks/useCosmosTxSender";
import { getTxUrl, maskAddress } from "helpers";
import Prompt from "./Prompt";

export function TxPrompt(props: TxState) {
  const { message, ...rest } = toPrompt(props);
  return (
    <Prompt {...rest}>
      {(isError(props) || isSuccess(props)) && props.tx && (
        <>
          <ExtLink
            href={getTxUrl(props.tx.chainID, props.tx.hash)}
            className="text-blue dark:text-blue-l2 text-sm"
          >
            {maskAddress(props.tx.hash)}
          </ExtLink>
        </>
      )}
      <p>{message}</p>]
      {isSuccess(props) && props.success.link && (
        <>
          <Link to={props.success.link.url}>
            {props.success.link.description}
          </Link>
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
    return { type: "loading", headline: "Transaction", message: props.error };
  } else {
    return {
      type: "loading",
      headline: "Transaction",
      message: props.success.message,
    };
  }
}
