type Props = { disconnect: () => void; disabled: boolean };
export default function Disconnect(props: Props) {
  return (
    <button
      disabled={props.disabled}
      onClick={props.disconnect}
      className="uppercase text-sm bg-angel-orange hover:text-black p-2 text-angel-grey"
    >
      disconnect
    </button>
  );
}
