type Props = {
  bgColorClass: string; //the color of the dots
  widthClass: string;
  gapClass: string;
  className?: string;
};

export default function Loader({
  bgColorClass,
  widthClass,
  gapClass,
  className = "",
}: Props) {
  const boxStyles = `${bgColorClass} ${widthClass} aspect-square rounded-full animate-bounce`;
  return (
    <div
      data-testid="loader"
      className={`w-full h-full bg-none-400 flex items-center justify-center ${gapClass} ${className}`}
    >
      <div className={`${boxStyles}`} />
      <div className={`${boxStyles} box-delay-1`} />
      <div className={`${boxStyles} box-delay-2`} />
    </div>
  );
}
