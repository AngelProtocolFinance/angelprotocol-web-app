export default function Submitter(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    _classes?: string;
  }
) {
  const { _classes, children } = props;
  return (
    <button
      {...props}
      className={`justify-self-center text-blue-accent hover:text-angel-blue 
      uppercase text-white font-extrabold ${_classes || ""}`}
    >
      {children}
    </button>
  );
}
