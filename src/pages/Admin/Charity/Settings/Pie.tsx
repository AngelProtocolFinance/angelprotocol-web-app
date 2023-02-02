type Props = {
  series: number[];
  max?: number; //must be greater than series total
  classes?: string;
};

export default function Pie({ series, max, classes }: Props) {
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
          className={UNALLOCATED_COLOR.fill}
        />
      );
    }
    return paths;
  }

  if (series.length <= 0 && !max) {
    return null;
  }

  return (
    <svg
      viewBox="-1 -1 2 2"
      style={{ transform: "rotate(-0.25turn)" }}
      className={classes}
    >
      {getPaths()}
    </svg>
  );
}

type PieColor = { bg: string; fill: string };
export const pieColors: PieColor[] = [
  { bg: "bg-blue-l2", fill: "fill-blue-l2" },
  { bg: "bg-blue", fill: "fill-blue" },
  { bg: "bg-blue-d2", fill: "fill-blue-d2" },
  { bg: "bg-orange-l2", fill: "fill-orange-l2" },
  { bg: "bg-orange", fill: "fill-orange" },
  { bg: "bg-orange-d2", fill: "fill-orange-d2" },
  { bg: "bg-red-l2", fill: "fill-red-l2" },
  { bg: "bg-red", fill: "fill-red" },
  { bg: "bg-red-d2", fill: "fill-red-d2" },
];

export const UNALLOCATED_COLOR: PieColor = {
  bg: "bg-green",
  fill: "fill-green",
};
