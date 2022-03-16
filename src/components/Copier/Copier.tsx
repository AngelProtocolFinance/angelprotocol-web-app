import Icon, { IconTypes } from "components/Icons/Icons";
import useCopier from "./useCopier";

export default function Copier(props: { text: string; colorClass: string }) {
  const { handleCopy, copied } = useCopier(props.text);
  return (
    <button onClick={handleCopy}>
      {(copied && (
        <Icon
          iconType={IconTypes.OutlineCheck}
          className={`${props.colorClass} hover:text-orange cursor-default`}
          title="Copied!"
        />
      )) || (
        <Icon
          iconType={IconTypes.OutlineCopy}
          className={`${props.colorClass} hover:text-orange" title="Copy Address`}
        />
      )}
    </button>
  );
}
