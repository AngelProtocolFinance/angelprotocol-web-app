import { ReactNode } from "react";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import usePollEnder from "components/Transactors/PollEnder/usePolllEnder";
import useVoter from "components/Transactors/Voter/useVoter";
import useDetails from "../usePollDetails";

export default function PollAction(props: { poll_id: number }) {
  const { wallet } = useGetWallet();
  const details = useDetails(props.poll_id);
  const showPollEnder = usePollEnder(props.poll_id);
  const showVoter = useVoter(props.poll_id);
  const is_voted = details.vote !== undefined;
  const W = wallet !== undefined;
  const V = is_voted;
  const E = details.vote_ended;
  const P = details.status !== "in_progress";
  const C = details.creator === wallet?.address;
  let node: ReactNode = null;

  //poll has ended
  if (P) {
    node = <Text>poll has ended</Text>;
    //poll hasn't ended
  } else {
    if (E) {
      //voting period ended
      if (V || C) {
        node = <Action onClick={showPollEnder}>End Poll</Action>;
      } else {
        node = <Text>vote period has ended</Text>;
      }
    } else {
      if (V && W) {
        node = <Text>you voted {details.vote}</Text>;
      } else {
        node = <Action onClick={showVoter}>Vote</Action>;
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
 * C - is creator?
 */

/** button displays
 * vote = !V && !E
 * you voted yes | no = W && V && !P
 * voting period ended = E && !P
 * end poll = E && (V || C)
 * poll has ended = P
 */

function Action(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="text-xs font-bold uppercase font-heading px-6 pt-1.5 pb-1 rounded-md bg-blue-accent hover:bg-blue border-2 border-white/30"
    />
  );
}

function Text(props: { children: ReactNode }) {
  return <p className="uppercase text-sm">{props.children}</p>;
}
