interface Props {
  a: number;
  b: number;
  formatter: (a: number | string) => string | number;
}
export const DiffCell = ({ formatter, a, b }: Props) => {
  const diff = b - a;
  if (diff === 0) {
    return <td className="text-right">{formatter(b)}</td>;
  }

  if (diff > 0) {
    return (
      <td className="text-right text-green">
        {formatter(b)} <span className="text-2xs">(+{formatter(diff)})</span>
      </td>
    );
  }
  return (
    <td className="text-right text-red">
      {formatter(b)}{" "}
      <span className="text-2xs">(-{formatter(Math.abs(diff))})</span>
    </td>
  );
};
