import { unpack } from "helpers";
import { Horizontal } from "./horizontal";
import { Vertical } from "./vertical";

interface Classes {
  container?: string;
  horizontal?: string;
  vertical?: string;
}

export function Responsive(props: Classes) {
  const s = unpack(props);
  return (
    <>
      <Vertical className={`${s.container} ${s.vertical}`} />
      <Horizontal classes={`${s.container} ${s.horizontal}`} />
    </>
  );
}
