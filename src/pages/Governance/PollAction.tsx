import { ReactNode } from "react";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { PollStatus } from "services/terra/types";
import useDetails from "./useDetails";
import usePollAction from "./usePollAction";
import useVoter from "components/Voter/useVoter";

export default function PollAction(props: { poll_id?: string }) {
  const wallet = useConnectedWallet();
  const details = useDetails(props.poll_id);
  const end_poll = usePollAction(props.poll_id);
  const showVoter = useVoter(props.poll_id);
  const is_voted = details.vote !== undefined;
  const W = !!wallet;
  const V = is_voted;
  const E = details.vote_ended;
  const P = details.status !== PollStatus.in_progress;
  let node: ReactNode = null;

  //poll has ended
  if (P) {
    node = <Text>poll has ended</Text>;
    //poll hasn't ended
  } else {
    if (E) {
      //voting period ended
      if (V) {
        node = <Action title="End poll" action={end_poll} />;
      } else {
        node = <Text>vote period has ended</Text>;
      }
    } else {
      if (V && W) {
        node = <Text>you voted {details.vote}</Text>;
      } else {
        node = <Action title="Vote" action={showVoter} />;
      }
      //voting period hasn't ended
    }
  }

  return <>{node}</>;
}
/** states
 * W - is wallet connected?
 * V - already voted ?
 * E - voting period done ?
 * P - poll ended ?
 */

/** button displays
 * vote = !V && !E
 * you voted yes | no = W && V && !P
 * voting period ended = E && !P
 * end poll = V && P
 * poll has ended = P
 */

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

function Text(props: { children: ReactNode }) {
  return <p className="uppercase text-sm">{props.children}</p>;
}
