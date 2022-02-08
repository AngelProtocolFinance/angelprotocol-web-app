import { BiCopy, BiCheck } from "react-icons/bi";
import useCopier from "./useCopier";

export default function Copier(props: { text: string; colorClass: string }) {
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
