import Icon from "components/Icon";
import useCopier from "./useCopier";

type Props = {
  text: string;
  classes?: string;
  size?: { copy?: number; check?: number };
};

export default function Copier({ text, classes = "", size }: Props) {
  const { handleCopy, copied } = useCopier();
  return (
    <button type="button" onClick={() => handleCopy(text)}>
      {(copied && (
        <Icon
          type="Check"
          className={`${classes} cursor-default hover:text-current`}
          title="Copied!"
          size={size?.check}
        />
      )) || (
        <Icon
          type="Copy"
          className={`${classes} cursor-pointer`}
          title="Copy Address"
          size={size?.copy}
        />
      )}
    </button>
  );
}
