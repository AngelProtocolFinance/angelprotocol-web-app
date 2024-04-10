import { useEffect } from "react";

/** use to finish rendering first before throwing error */
export default function ErrorUI(props: { error: unknown }) {
  useEffect(() => {
    throw props.error;
  }, [props.error]);
  return <></>;
}
