import { Link } from "react-router-dom";
import { BankingDetails } from "types/aws";
import { updateRegData } from "services/aws/registration";
import BankDetails from "components/BankDetails";
import ExtLink from "components/ExtLink";
import Icon from "components/Icon/Icon";
import { steps } from "../../routes";
import { useRegState, withStepGuard } from "../StepGuard";
import FormButtons from "./FormButtons";
import useSubmit from "./useSubmit";

function Banking() {
  const { submit } = useSubmit();
  const { data } = useRegState<5>();

  if (data.banking) {
    return (
      <div className="flex flex-col max-sm:items-center gap-4">
        <h2 className="text-center sm:text-left text-xl mb-2">
          Setup your banking details
        </h2>

        <ExtLink>
          <Icon type="ExternalLink" />
          <span>Bank statement</span>
        </ExtLink>
        <p>
          <span>account id:</span>
          {data.banking.wise_recipient_id}
        </p>
        <button
          type="button"
          onClick={() => {
            updateRegData("reg", data.init.reference, (draft) => {
              (
                draft.Registration as Partial<BankingDetails>
              ).BankStatementFile = undefined;
            });
          }}
        >
          change
        </button>

        <div className="grid grid-cols-2 sm:flex gap-2 w-full">
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
            className="py-3 min-w-[8rem] btn-orange btn-reg"
          >
            Continue
          </Link>
        </div>
      </div>
    );
  }

  return <BankDetails FormButtons={FormButtons} onSubmit={submit} />;
}

export default withStepGuard(Banking);
