export default function Action(props: {
  title: string;
  action: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={props.action}
      className="font-heading text-sm text-white-grey bg-blue-accent hover:bg-angel-blue border-2 border-white/30 shadow-sm w-32 uppercase text-center pt-1.5 pb-1 mb-1 lg:mb-0 rounded-md disabled:bg-gray-400 disabled:cursor-default"
      disabled={props.disabled}
    >
      {props.title}
    </button>
  );
}
