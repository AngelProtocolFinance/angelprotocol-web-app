import { useConnectedWallet } from "@terra-money/wallet-provider";
import { PollStatus } from "services/terra/types";
import useDetails from "./useDetails";
import usePollAction from "./usePollAction";

export default function PollAction(props: { poll_id?: string }) {
  const wallet = useConnectedWallet();
  const details = useDetails(props.poll_id);
  const end_poll = usePollAction(props.poll_id);
  const is_voted = details.vote !== undefined;

  const defaultClasses =
    "bg-blue-accent hover:bg-angel-blue border-2 border-opacity-30";
  const defaultAction = (
    <Action disabled title="Vote" classes={defaultClasses} />
  );

  if (!wallet) {
    //what to show when wallet is not connected
    if (details.vote_ended) {
      return (
        //allow user to click vote, form will prompt to connect wallet
        <Action
          title="Voting period ended"
          classes={"bg-white bg-opacity-10 text-gray-400"}
          disabled
        />
      );
    } else {
      return defaultAction;
    }

    //wallet is connected, voting has ended, but poll is still in progress
  } else if (details.vote_ended && details.status === PollStatus.in_progress) {
    if (wallet.walletAddress === details.creator || is_voted) {
      //both creator and voters can end the poll, no reason to let non-participant to do this
      return (
        <Action action={end_poll} title="End poll" classes={defaultClasses} />
      );
    } else {
      return (
        <Action
          title="Voting period ended"
          classes={"bg-white bg-opacity-10 text-gray-400"}
          disabled
        />
      );
    }
    //wallet is connected, voting has ended, poll has ended
  } else if (details.vote_ended && details.status !== PollStatus.in_progress) {
    if (wallet.walletAddress === details.creator || is_voted) {
      //let creator click claim action, and just get prompted if deposit token is not claimable
      return (
        <Action
          disabled
          title="Claim deposit tokens"
          classes={defaultClasses}
        />
      );
    } else {
      return (
        <Action
          title="Voting period ended"
          classes={"bg-white bg-opacity-10 text-gray-400"}
          disabled
        />
      );
    }
  } else {
    if (is_voted) {
      //voting period isn't ended and user already voted
      <Action disabled title="You voted yes" classes="" />;
    }
    return (
      <Action
        title="Vote"
        classes="bg-blue-accent hover:bg-angel-blue border-2 border-opacity-30"
        disabled
      />
    );
  }
}

type ActionProps =
  | { disabled?: false; action: () => void; title: string; classes: string }
  | { disabled: true; action?: never; title: string; classes: string };
function Action(props: ActionProps) {
  return (
    <button
      disabled={props.disabled}
      onClick={props.action}
      className={`text-xs font-bold uppercase font-heading px-6 pt-1.5 pb-1 rounded-md ${props.classes}`}
    >
      {props.title}
    </button>
  );
}

//is_poll done
