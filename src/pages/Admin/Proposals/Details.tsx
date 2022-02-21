import { RouteComponentProps } from "react-router";
import { useProposal } from "services/terra/admin/queriers";

export type ProposalIdParam = { id: string };

export default function Details(props: RouteComponentProps<ProposalIdParam>) {
  const proposalId = props.match.params.id;
  const { proposal } = useProposal(proposalId);

  return <div>{proposal.status}</div>;
}
