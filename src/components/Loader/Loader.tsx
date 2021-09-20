type Props = {
  bgColorClass: string; //the color of the dots
  widthClass: string;
  gapClass: string;
};

export default function Loader({ bgColorClass, widthClass, gapClass }: Props) {
  const boxStyles = `${bgColorClass} ${widthClass} aspect-square rounded-full animate-bounce`;
  return (
    <div
      className={`w-full h-full bg-none-400 flex items-center justify-center ${gapClass}`}
    >
      <div className={`${boxStyles}`}></div>
      <div className={`${boxStyles} box-delay-1`}></div>
      <div className={`${boxStyles} box-delay-2`}></div>
    </div>
  );
}
