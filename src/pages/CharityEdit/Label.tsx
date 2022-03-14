export default function Label(props: { text: string; id: string }) {
  return (
    <label
      htmlFor={props.id}
      className="text-xs font-heading font-semibold uppercase text-white text-opacity-100"
    >
      {props.text}
    </label>
  );
}
