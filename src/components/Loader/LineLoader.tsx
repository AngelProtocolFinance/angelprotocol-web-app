type Props = {
  color: string; //the color of the dots
  size: string;
  spacing: string;
};

export default function LineLoader({ color, size, spacing }: Props) {
  const boxStyles = `bg-${color} w-${size} maintain-aspect rounded-full animate-bounce`;
  return (
    <div
      className={`w-full h-full bg-none-400 flex items-center justify-center gap-${spacing}`}
    >
      <div className={`${boxStyles}`}></div>
      <div className={`${boxStyles} box-delay-1`}></div>
      <div className={`${boxStyles} box-delay-2`}></div>
    </div>
  );
}
