type Submit = {
  submit?: true;
  disabled?: boolean;
  title: string;
  classes: string;
  onClick?: never;
};

type Button = {
  submit?: never;
  disabled?: boolean;
  title: string;
  classes: string;
  onClick: () => void;
};

type Props = Submit | Button;

export default function Action(props: Props) {
  return (
    <button
      className={`disabled:bg-gray-300 rounded-xl uppercase text-base font-bold text-white mb-3 ${props.classes}`}
      type={props.submit ? "submit" : "button"}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );
}
