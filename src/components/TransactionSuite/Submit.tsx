import Loader from "components/Loader/Loader";
import { SubmitStage } from "services/transaction/types";

export default function Submit(props: SubmitStage) {
  const { message } = props;
  return (
    <div className="bg-white grid p-4 rounded-md w-full shadow-lg min-h-115 content-center">
      <p className="text-center text-angel-grey mb-6">{message}</p>
      <Loader bgColorClass="bg-angel-grey" gapClass="gap-2" widthClass="w-4" />
    </div>
  );
}
