import { SubmitStage } from "slices/transaction/types";
import Loader from "components/Loader";

export default function Submit(props: SubmitStage) {
  const { message } = props;
  return (
    <div className="bg-white grid p-4 rounded-md w-full shadow-lg min-h-[15rem] content-center">
      <p className="text-center text-gray-d2 mb-6">{message}</p>
      <Loader bgColorClass="bg-gray-d2" gapClass="gap-2" widthClass="w-4" />
    </div>
  );
}
