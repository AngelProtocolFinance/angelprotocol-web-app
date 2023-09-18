import { Transaction } from "types/tx";
import { DetailLabel } from "components/admin";
import Preview from "./Preview";

export default function Content(props: Transaction) {
  return (
    <>
      {props.meta && (
        <>
          <DetailLabel classes="mb-2">content</DetailLabel>
          <Preview {...props.meta} />
        </>
      )}
    </>
  );
}
