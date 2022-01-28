import useEndPoll from "./useEndpoll";

export type Props = { poll_id?: string };
export default function EnderForm(props: Props) {
  const endPoll = useEndPoll(props.poll_id);
  return (
    <div className="bg-white grid p-4 rounded-md w-full">
      <p>are you sure you want to end this poll?</p>
      <button type="button" onClick={endPoll}>
        confirm
      </button>
    </div>
  );
}
