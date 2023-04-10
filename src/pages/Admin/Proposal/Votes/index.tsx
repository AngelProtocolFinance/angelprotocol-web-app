import { ProposalDetails } from "services/types";
import Icon from "components/Icon";

export default function Votes({
  signed,
  signers,
  classes = "",
}: ProposalDetails & { classes?: string }) {
  console.log(signed, signers);
  return (
    <ul
      className={
        classes + " grid rounded border border-prim divide-y divide-prim"
      }
    >
      {signers.map((s) => {
        const confirmed = signed.includes(s);
        return (
          <li key={s} className="p-3 flex items-center justify-between text-sm">
            <span>{s}</span>
            <Icon
              type={confirmed ? "CheckCircle" : "Circle"}
              className={confirmed ? "text-green text-lg" : "text-gray text-sm"}
            />
          </li>
        );
      })}
    </ul>
  );
}
