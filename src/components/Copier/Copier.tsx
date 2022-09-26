import Icon from "components/Icon";
import useCopier from "./useCopier";

export default function Copier(props: { text: string; colorClass: string }) {
  const { handleCopy, copied } = useCopier(props.text);
  return (
    <button onClick={handleCopy}>
      {(copied && (
        <Icon
          type="Check"
          className={`${props.colorClass} hover:text-orange cursor-default`}
          title="Copied!"
        />
      )) || (
        <Icon
          type="Copy"
          className={`${props.colorClass} hover:text-orange`}
          title="Copy Address"
        />
      )}
    </button>
  );
}
