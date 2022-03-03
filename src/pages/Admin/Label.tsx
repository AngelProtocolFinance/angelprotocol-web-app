export default function Label(props: {
  text: string;
  textColor?: string;
  required?: true;
}) {
  const { textColor = "text-angel-grey", text } = props;
  return (
    <p className={`mb-2 text-xs font-heading uppercase font-bold ${textColor}`}>
      {text} {props.required && <span className="text-red-400">*</span>}
    </p>
  );
}
