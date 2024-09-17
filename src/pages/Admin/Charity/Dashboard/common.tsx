interface Props {
  amount: number;
  to: string;
}
export function Deduction(props: Props) {
  if (props.amount === 0) return null;
  return (
    <div>
      {props.amount} to {props.to}
    </div>
  );
}
