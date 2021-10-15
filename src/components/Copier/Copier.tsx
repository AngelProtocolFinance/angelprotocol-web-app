import { BiCopy, BiCheck } from "react-icons/bi";
import useCopier from "./useCopier";

export type Addr = string & {
  __type: "HumanAddr";
};

type Props = {
  text?: Addr;
  colorClass: string;
};

export default function Copier(props: Props) {
  const { handleCopy, copied } = useCopier(props.text);
  return (
    <button onClick={handleCopy}>
      {(copied && (
        <BiCheck
          className={`${props.colorClass} hover:text-orange cursor-default`}
          title="Copied!"
        />
      )) || (
        <BiCopy
          className={`${props.colorClass} hover:text-orange" title="Copy Address`}
        />
      )}
    </button>
  );
}
