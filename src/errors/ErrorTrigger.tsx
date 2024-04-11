import { useEffect } from "react";

/** renders nothing, and throws error that would be catched by closest boundary */
export default function ErrorTrigger(props: { error: unknown }) {
  useEffect(() => {
    throw props.error;
  }, [props.error]);
  return <></>;
}
