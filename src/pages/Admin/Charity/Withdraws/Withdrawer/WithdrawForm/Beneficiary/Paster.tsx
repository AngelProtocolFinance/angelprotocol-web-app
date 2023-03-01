import Icon from "components/Icon";

type Props = { onPaste(text: string): void };

export default function Paster({ onPaste }: Props) {
  const paste = async () => {
    const text = await navigator.clipboard.readText();
    onPaste(text);
  };

  return (
    <button type="button" onClick={paste}>
      <Icon
        type="Clipboard"
        className="hover:text-orange cursor-pointer"
        title="Paste Address"
        size={24}
      />
    </button>
  );
}
