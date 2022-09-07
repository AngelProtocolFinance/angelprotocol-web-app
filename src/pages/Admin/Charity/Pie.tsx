type Props = {
  series: number[];
  max?: number; //must be greater than series total
};

export default function Pie({ series, max }: Props) {
  function getArcCoord(pct: number) {
    const x = Math.cos(2 * Math.PI * pct);
    const y = Math.sin(2 * Math.PI * pct);
    return [x, y] as const;
  }

  function getPaths() {
    const total = Math.max(
      max || 0,
      series.reduce((total, num) => total + num, 0)
    );

    let cumulativePct = 0;

    const paths = series.map((val, i) => {
      const currPct = val / total;
      const [startX, startY] = getArcCoord(cumulativePct);
      cumulativePct += currPct;
      const [endX, endY] = getArcCoord(cumulativePct);
      const largeArcFlag = currPct > 0.5 ? 1 : 0;
      return (
        <path
          key={i}
          d={`M ${startX} ${startY} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} L 0 0`}
          className={`${pieColors[i].fill}`}
        />
      );
    });

    //unallocaled path
    const idxAfterLastEl = series.length;
    if (max && cumulativePct < 1) {
      const [startX, startY] = getArcCoord(cumulativePct);
      const [endX, endY] = getArcCoord(1);
      const largeArcFlag = 1 - cumulativePct > 0.5 ? 1 : 0;
      paths.push(
        <path
          key={idxAfterLastEl}
          d={`M ${startX} ${startY} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} L 0 0`}
          className="fill-emerald-400"
        />
      );
    }
    return paths;
  }

  if (series.length <= 0) {
    return null;
  }

  return (
    <svg
      viewBox="-1 -1 2 2"
      style={{ transform: "rotate(-0.25turn)" }}
      className="max-w-sm"
    >
      {getPaths()}
    </svg>
  );
}

export const pieColors = [
  { bg: "bg-sky-50", fill: "fill-sky-50" },
  { bg: "bg-sky-200", fill: "fill-sky-200" },
  { bg: "bg-sky-400", fill: "fill-sky-400" },
  { bg: "bg-sky-500", fill: "fill-sky-600" },
  { bg: "bg-amber-200", fill: "fill-amber-200" },
  { bg: "bg-amber-400", fill: "fill-amber-400" },
  { bg: "bg-amber-600", fill: "fill-amber-600" },
  { bg: "bg-fuchsia-200", fill: "fill-fuchsia-200" },
  { bg: "bg-fuchsia-400", fill: "fill-fuchsia-400" },
  { bg: "bg-fuchsia-600", fill: "fill-fuchsia-600" },
];
