import BankDetails from "components/BankDetails";
import ExtLink from "components/ExtLink";
import Icon from "components/Icon/Icon";
import { useState } from "react";
import { Link } from "react-router-dom";
import { steps } from "../../routes";
import { useRegState, withStepGuard } from "../StepGuard";
import FormButtons from "./FormButtons";
import useSubmit from "./useSubmit";

function Banking() {
  const { data } = useRegState<5>();
  const [isChanging, setIsChanging] = useState(false);
  const { submit } = useSubmit();

  if (data.banking && !isChanging) {
    return (
      <div className="flex flex-col items-start max-sm:items-center">
        <h2 className="text-center sm:text-left text-xl mb-2">
          Banking details
        </h2>

        <p className="mt-6 mb-1">
          <span className="uppercase text-sm font-semibold">account id: </span>
          <span className="text-navy-l1 ">
            {data.banking.wise_recipient_id}
          </span>
        </p>
        <ExtLink
          href={data.banking.BankStatementFile.publicUrl}
          className="flex items-center gap-2 text-blue hover:text-blue-d1"
        >
          <Icon type="ExternalLink" />
          <span>Bank statement</span>
        </ExtLink>
        <button
          className="btn-red px-2 py-1 rounded text-xs mt-2 mb-8"
          type="button"
          onClick={() => setIsChanging(true)}
        >
          change
        </button>

        <div className="grid grid-cols-2 sm:flex gap-2 w-full mt-auto">
          <Link
            to={`../${steps.docs}`}
            state={data.init}
            className="py-3 min-w-[8rem] btn-outline-filled btn-reg"
          >
            Back
          </Link>
          <Link
            to={`../${steps.summary}`}
            state={data.init}
            className="py-3 min-w-[8rem] btn-blue btn-reg"
          >
            Continue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start max-sm:items-center">
      {isChanging && (
        <button
          className="btn-blue px-2 py-1 rounded text-xs mt-2 mb-4"
          type="button"
          onClick={() => setIsChanging(false)}
        >
          cancel
        </button>
      )}
      <h2 className="text-center sm:text-left text-xl mb-4">
        {isChanging ? "Update" : "Setup"} your banking details
      </h2>
      <BankDetails FormButtons={FormButtons} onSubmit={submit} />
    </div>
  );
}

export default withStepGuard(Banking);
