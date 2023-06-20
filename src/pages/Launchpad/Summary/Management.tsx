import { TManagement } from "slices/launchpad/types";
import { Info } from "components/Status";
import { isEmpty } from "helpers";
import Section, { SectionProps } from "./Section";

export default function Management({
  members,
  proposal,
  ...props
}: SectionProps<TManagement>) {
  const _members = members.map((m) => <li key={m}>{m}</li>);

  return (
    <Section {...props}>
      <p className="font-semibold mb-2">Members:</p>
      {isEmpty(_members) ? (
        <Info classes="mt-2">
          No members set - creator of this AST would be a default member
        </Info>
      ) : (
        <ul className="list-disc list-inside grid gap-y-2">{_members}</ul>
      )}
      <p className="font-semibold mt-6 mb-2">Settings:</p>

      <ul className="list-disc list-inside grid gap-y-2">
        <li>
          Proposals can be executed when{" "}
          <span className="font-semibold">{proposal.threshold}</span> out of{" "}
          {<span className="font-semibold">{members.length || 1}</span>} members
          cast their vote.
        </li>
        <li>
          Proposals auto-execution is turned{" "}
          <span className="font-semibold">
            {proposal.isAutoExecute ? "ON" : "OFF"}
          </span>
        </li>
      </ul>
    </Section>
  );
}
