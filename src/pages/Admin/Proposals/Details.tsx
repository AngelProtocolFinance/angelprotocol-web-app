import { RouteComponentProps } from "react-router";
import { useProposal } from "services/terra/admin/queriers";
import PollAction from "./PollAction";
import Status from "./Status";
import useDetails from "./useDetails";

export type ProposalIdParam = { id: string };

export default function Details(props: RouteComponentProps<ProposalIdParam>) {
  const proposalId = props.match.params.id;
  const { proposal } = useProposal(proposalId);
  const proposalDetails = useDetails(proposal);

  return (
    <div className="grid content-start w-full min-h-screen padded-container">
      <div className="bg-white bg-opacity-10 text-white-grey text-opacity-80 rounded-md shadow-md p-4">
        <div className="flex justify-between font-bold">
          <p className="font-mono">ID: {proposal.id}</p>
          <Status status={proposal.status} />
        </div>
        <div className="mt-8 mb-2">
          <h4 className="font-bold text-lg text-white">{proposal.title}</h4>
          <PollAction {...proposalDetails} />
        </div>
        <div className="h-0.5 w-full bg-white bg-opacity-20 rounded-full shadow-inner"></div>
      </div>
    </div>
  );
}
