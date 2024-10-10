import { appRoutes } from "constants/routes";
import { useErrorContext } from "contexts/ErrorContext";
import { toState } from "helpers/state-params";
import { useNavigate } from "react-router-dom";
import { useLazyIntentQuery } from "services/apes";

type Props = { intentId: string; classes?: string };
export default function IntentResumer({ intentId, classes }: Props) {
  const navigate = useNavigate();
  const [getIntent, { isLoading }] = useLazyIntentQuery();
  const { handleError } = useErrorContext();

  async function resumeIntent() {
    try {
      const intent = await getIntent({ transactionId: intentId }).unwrap();
      navigate(
        `${appRoutes.donate}/${intent.endowmentId}?_s=${toState(intent)}`
      );
    } catch (err) {
      handleError(err, "parsed");
    }
  }
  return (
    <button
      disabled={isLoading}
      type="button"
      className={`${classes} btn-blue px-3 py-1 text-xs`}
      onClick={resumeIntent}
    >
      {isLoading ? "Loading..." : "Finish paying"}
    </button>
  );
}
