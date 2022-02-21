import { ReactNode } from "react";
import { useVoter } from "services/terra/admin/queriers";
import { ProposalDetails } from "./useDetails";

export default function PollAction(props: ProposalDetails) {
  const { voter } = useVoter();

  const EXED = props.isExecuted;
  const EX = props.isExecutable;
  const VE = props.isVoteEnded;
  const V = voter.weight !== null;

  let node: ReactNode = null;
  //poll is executed
  if (EXED) {
    node = <Text>poll has ended</Text>;
    //voting period ended and poll is passed waiting to be executed
  } else if (EX) {
    node = <button>execute poll</button>;
    //voting period ended, but poll is not passed
  } else if (VE) {
    node = <Text>voting period has ended</Text>;
  } else {
    //voting ongoing
    if (V) {
      node = <Text>you already voted</Text>;
    } else {
      node = <button>vote poll</button>;
    }
  }
  return <>{node}</>;
}

function Text(props: { children: ReactNode }) {
  return <p className="uppercase text-sm">{props.children}</p>;
}
