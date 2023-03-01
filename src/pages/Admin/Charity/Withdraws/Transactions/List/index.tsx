import { WithdrawLog } from "types/aws";
import Log from "./Log";

type Props = {
  withdraws: WithdrawLog[];
  classes?: string;
};
export default function List({ classes = "", withdraws }: Props) {
  return (
    <ul className={`${classes} gap-2 sm:grid-cols-3`}>
      {withdraws.map((w) => (
        <Log {...w} key={w.proposal_id} />
      ))}
    </ul>
  );
}
