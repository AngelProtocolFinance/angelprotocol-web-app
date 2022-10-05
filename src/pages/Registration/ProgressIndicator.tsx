import { useRegistrationQuery } from "services/aws/registration";
import { getRegistrationState } from "./helpers";

export default function ProgressIndicator() {
  const { charity } = useRegistrationQuery();
  const state = getRegistrationState(charity);
  const progress = [
    state.contactDetails.isComplete,
    state.documentation.isComplete,
    state.additionalInformation.isComplete,
    state.walletRegistration.isComplete,
    state.emailVerification.isComplete,
  ];
  const completedCount = progress.reduce(
    (total, completed) => (completed ? ++total : total),
    0
  );
  const percent = (completedCount / progress.length) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <p>
          {completedCount} of {progress.length} Steps
        </p>
        <p>{percent}%</p>
      </div>
      <div className="h-4 w-full bg-white-grey rounded-3xl">
        <div
          style={{ width: `${percent}%` }}
          className={`h-full bg-angel-blue rounded-3xl`}
        />
      </div>
    </div>
  );
}
