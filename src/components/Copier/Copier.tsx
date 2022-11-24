import Icon from "components/Icon";
import useCopier from "./useCopier";

type Props = {
  text: string;
  classes?: string;
  size?: { copy?: number; check?: number };
};

export default function Copier({ text, classes = "", size }: Props) {
  const { handleCopy, copied } = useCopier(text);
  return (
    <button type="button" onClick={handleCopy}>
      {(copied && (
        <Icon
          type="Check"
          className={`${classes} hover:text-orange cursor-default`}
          title="Copied!"
          size={size?.check}
        />
      )) || (
        <Icon
          type="Copy"
          className={`${classes} hover:text-orange`}
          title="Copy Address"
          size={size?.copy}
        />
      )}
    </button>
  );
}
