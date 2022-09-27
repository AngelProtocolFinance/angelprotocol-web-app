export function Submitter(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    _classes?: string;
  }
) {
  const { _classes } = props;
  return (
    <button
      {...props}
      className={`justify-self-center text-blue-d1 hover:text-blue disabled:text-grey-accent
      uppercase text-white font-extrabold ${_classes || ""}`}
    />
  );
}
