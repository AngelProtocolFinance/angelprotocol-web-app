import { Link } from "react-router-dom";
import { steps } from "pages/Registration/routes";
import { APP_NAME } from "constants/env";
import { useRegState } from "../StepGuard";

export default function Content() {
  const { data } = useRegState<3>();
  return (
    <div className="grid">
      <h3 className="text-lg">Bank Details</h3>
      <p className="text-gray-d1 dark:text-gray text-sm mt-2">
        {`Once you have registered your bank account, we shall be able to create
        your ${APP_NAME} endowment account. You can change your bank details at any
        time.`}
      </p>

      <div className="grid mt-8 border border-prim p-8 rounded"></div>

      <div className="grid grid-cols-2 md:flex gap-3 items-center mt-8">
        <Link
          to={`../${steps.doc}`}
          state={data.init}
          className="min-w-[8rem] btn-outline-filled btn-reg"
        >
          Back
        </Link>
        <Link
          to={`../${steps.summary}`}
          state={data.init}
          className="min-w-[8rem] btn-orange btn-reg"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}
