import useEndPoll from "./useEndPoll";

export type Props = { poll_id: number };
export default function EnderForm(props: Props) {
  const { endPoll } = useEndPoll(props.poll_id);
  return (
    <div className="bg-white-grey grid justify-items-center p-4 rounded-md w-full">
      <p className="text-angel-grey">are you sure you want to end this poll?</p>
      <button
        type="button"
        className="rounded-md bg-angel-orange text-white hover:text-angel-grey font-heading px-4 py-1 text-xs uppercase font-bold mt-4"
        onClick={endPoll}
      >
        confirm
      </button>
    </div>
  );
}
