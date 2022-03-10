export default function Submitter(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    _classes?: string;
    _text: string;
  }
) {
  return (
    <button
      {...props}
      className={`justify-self-center text-blue-accent hover:text-angel-blue 
      uppercase text-white font-extrabold ${props._classes || ""}`}
    >
      {props._text}
    </button>
  );
}
