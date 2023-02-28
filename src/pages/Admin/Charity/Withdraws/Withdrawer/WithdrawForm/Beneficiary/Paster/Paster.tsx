import Icon from "components/Icon";
import usePaster from "./usePaster";

type Props = { onPaste(text: string): void };

export default function Paster({ onPaste }: Props) {
  const { canPaste, text } = usePaster();

  return (
    <button
      type="button"
      onClick={() => canPaste && onPaste(text)}
      disabled={!canPaste}
    >
      <Icon
        type="Clipboard"
        className="hover:text-orange cursor-pointer"
        title="Paste Address"
        size={24}
      />
    </button>
  );
}
