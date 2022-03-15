export default function ConnectButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    _icon: string;
  }
) {
  const { _icon, children, ...restProps } = props;
  return (
    <button
      {...restProps}
      className="transform active:translate-x-1 bg-thin-blue disabled:bg-grey-accent text-angel-grey hover:bg-angel-blue hover:text-white flex items-center gap-2 rounded-full items-center p-1 pr-4 shadow-md"
    >
      <img
        src={_icon}
        className="w-8 h-8 p-1.5 bg-white-grey rounded-full shadow-md"
        alt=""
      />
      <p className="uppercase text-sm text-white">{children}</p>
    </button>
  );
}
