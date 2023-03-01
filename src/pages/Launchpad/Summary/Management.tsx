import { TManagement } from "slices/launchpad/types";
import { isEmpty } from "helpers";
import Info from "../common/Info";
import Section, { SectionProps } from "./Section";

export default function Management({
  members,
  proposal,
  ...props
}: SectionProps<TManagement>) {
  const _members = members.map((m) => <li key={m.addr}>{m.addr}</li>);

  return (
    <Section {...props}>
      <p className="font-semibold">Members:</p>
      {isEmpty(_members) ? (
        <Info classes="mt-2">
          No members set - creator of this AIF would be a default member
        </Info>
      ) : (
        _members
      )}
      <p className="font-semibold mt-6 mb-2">Proposal settings:</p>
      <ul className="list-disc list-inside grid gap-2">
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
