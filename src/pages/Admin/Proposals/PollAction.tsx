import { ReactNode } from "react";
import useAdminVoter from "components/Transactors/AdminVoter/useAdminVoter";
import useProposalExecutor from "components/Transactors/AdminExecuter/useProposalExecutor";
import { ProposalDetails } from "./useDetails";

export default function PollAction(props: ProposalDetails) {
  const showAdminVoter = useAdminVoter(props.numId);
  const showAdminExecuter = useProposalExecutor(props.numId);

  const EXED = props.isExecuted;
  const EX = props.isExecutable;
  const VE = props.isVoteEnded;
  const V = props.userVote !== undefined;

  let node: ReactNode = null;
  //poll is executed
  if (EXED) {
    node = <Text>poll has ended</Text>;
    //voting period ended and poll is passed waiting to be executed
  } else if (EX) {
    node = node = <Action action={showAdminExecuter} title="execute poll" />;
    //voting period ended, but poll is not passed
  } else if (VE) {
    node = <Text>voting period has ended</Text>;
  } else {
    //voting ongoing
    if (V) {
      node = <Text>you voted {props.userVote}</Text>;
    } else {
      node = <Action action={showAdminVoter} title="vote" />;
    }
  }
  return <>{node}</>;
}

function Text(props: { children: ReactNode }) {
  return <p className="uppercase text-sm">{props.children}</p>;
}

type ActionProps =
  | { disabled?: false; action: () => void; title: string }
  | { disabled: true; action?: never; title: string };
function Action(props: ActionProps) {
  return (
    <button
      disabled={props.disabled}
      onClick={props.action}
      className="text-xs font-bold uppercase font-heading px-6 pt-1.5 pb-1 rounded-md bg-blue-accent hover:bg-angel-blue border-2 border-opacity-30"
    >
      {props.title}
    </button>
  );
}
