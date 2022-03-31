export default function VoteStat(props: {
  title: string;
  value: number;
  pct: number;
  textColor: string;
}) {
  return (
    <p className={`font-mono uppercase ${props.textColor} items-center`}>
      <span>{props.title}</span>
      <span>{`${props.value} (${props.pct.toFixed(2)}%)`}</span>
    </p>
  );
}
