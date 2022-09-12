import { useRegistrationQuery } from "services/aws/registration";
import { getRegistrationState } from "./helpers";

const getBackground = (percent: number) =>
  `linear-gradient(to right, #3fa9f5 0%, #3fa9f5 ${percent}%, #fff ${percent}%, white 100%)`;

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
      <input
        type="range"
        className="w-full indicator"
        min="0"
        max="100"
        step="1"
        defaultValue={percent}
        disabled
        style={{ background: getBackground(percent) }}
      />
    </div>
  );
}
