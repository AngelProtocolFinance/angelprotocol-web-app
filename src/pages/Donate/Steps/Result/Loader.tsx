export default function Loader({
  thickness,
  classes = "",
}: {
  thickness: number;
  classes?: string;
}) {
  const t = thickness;
  const commands = `M 50 0 a 50 50 0 0 1 0 100 
  50 50 0 0 1 0 -100 
  v ${t} 
  a ${50 - t} ${50 - t} 0 0 0 0 ${100 - 2 * t} 
  ${50 - t} ${50 - t} 0 0 0 0 -${100 - 2 * t}`;

  return (
    <svg viewBox="0 0 100 100" className={`aspect-square ${classes}`}>
      <clipPath id="clip">
        <path d={commands} />
      </clipPath>

      <foreignObject x="0" y="0" width="100" height="100" clipPath="url(#clip)">
        <div className="animate-spin w-full h-full rounded-full bg-[conic-gradient(var(--tw-gradient-stops))] from-transparent to-orange" />
      </foreignObject>
    </svg>
  );
}
