import Loader from "components/Loader/Loader";
import { useGetter } from "store/accessors";

export default function Broadcast() {
  const { stage } = useGetter((state) => state.donation);
  return (
    <div className="bg-white grid p-4 rounded-md w-full shadow-lg min-h-115 content-center">
      <p className="text-center text-angel-grey mb-2">
        {stage.content?.message}
      </p>
      {stage.content?.url && (
        <a
          href={stage.content?.url}
          target="_blank"
          rel="noreferrer noopener"
          className="text-center text-angel-blue cursor-pointer mb-6"
        >
          view transaction status
        </a>
      )}
      <Loader bgColorClass="bg-angel-grey" gapClass="gap-2" widthClass="w-4" />
    </div>
  );
}
