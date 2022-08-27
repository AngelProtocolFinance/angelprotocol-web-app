import Icon from "./Icon";

type Props = {
  bgColorClass: string; //the color of the dots
  widthClass: string;
  gapClass: string;
};

export default function Loader({ bgColorClass, widthClass, gapClass }: Props) {
  const boxStyles = `${bgColorClass} ${widthClass} aspect-square rounded-full animate-bounce`;
  return (
    <div
      data-testid="loader"
      className={`w-full h-full bg-none-400 flex items-center justify-center ${gapClass}`}
    >
      <div className={`${boxStyles}`}></div>
      <div className={`${boxStyles} box-delay-1`}></div>
      <div className={`${boxStyles} box-delay-2`}></div>
    </div>
  );
}
export function TextLoader({
  text,
  classes,
}: {
  text: string;
  classes?: { container?: string; icon?: string; text?: string };
}) {
  return (
    <div
      className={`flex items-center gap-1 text-zinc-600 ${
        classes?.container ?? ""
      }`}
    >
      <Icon type="Loading" className={`animate-spin ${classes?.icon ?? ""}`} />
      <span className={`${classes?.text ?? ""}`}>{text}</span>
    </div>
  );
}
