import Loader from "components/Loader/Loader";
import { useGetter } from "store/accessors";

export default function Submit() {
  const { stage } = useGetter((state) => state.transaction);

  return (
    <div className="bg-white grid p-4 rounded-md w-full shadow-lg min-h-115 content-center">
      <p className="text-center text-angel-grey mb-6">
        {stage.content?.message}
      </p>
      <Loader bgColorClass="bg-angel-grey" gapClass="gap-2" widthClass="w-4" />
    </div>
  );
}
