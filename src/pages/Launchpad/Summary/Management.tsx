import { TManagement } from "slices/launchpad/types";
import { isEmpty } from "helpers";
import Section, { SectionProps } from "./Section";

export default function Management({
  members,
  proposal,
  ...props
}: SectionProps<TManagement>) {
  const _members = members.map((m) => <li key={m.addr}>{m.addr}</li>);

  return (
    <Section {...props}>
      {isEmpty(_members) ? (
        <p>No members set - creator of this AIF would be a default member</p>
      ) : (
        _members
      )}
      <h5>Proposal settings</h5>
      <ul>
        <li>Pass threshold is {proposal.threshold} %</li>
        <li>Voting duration is {proposal.duration} hours</li>
        <li>
          Proposal auto-execution is turned{" "}
          {proposal.isAutoExecute ? "ON" : "OFF"}
        </li>
      </ul>
    </Section>
  );
}
