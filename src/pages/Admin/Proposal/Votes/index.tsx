import { ProposalDetails } from "services/types";
import { maskAddress } from "helpers";

export default function Votes({
  signed,
  signers,
  classes = "",
}: ProposalDetails & { classes?: string }) {
  return (
    <ul className={classes + " grid gap-2"}>
      {signers.map((s) => (
        <li key={s}>
          <span>{maskAddress(s)}</span>
          <span>{signed.includes(s) ? "✓" : ""}</span>
        </li>
      ))}
    </ul>
  );
}
