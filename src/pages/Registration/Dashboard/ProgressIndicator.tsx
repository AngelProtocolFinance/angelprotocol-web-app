import { useRegistrationState } from "services/aws/registration";
import getRegistrationState from "./getRegistrationState";

const getBackground = (percent: number) =>
  `linear-gradient(to right, #4ca146 0%, #4ca146 ${percent}%, #fff ${percent}%, white 100%)`;

export default function ProgressIndicator() {
  const { charity } = useRegistrationState();
  const state = getRegistrationState(charity);
  const progress = [
    state.stepOne.completed,
    state.stepTwo.completed,
    state.stepThree.completed,
    state.stepFour.completed,
  ];
  const completedCount = progress.reduce(
    (total, completed) => (completed ? ++total : total),
    0
  );
  const percent = (completedCount / progress.length) * 100;

  return (
    <div className="w-full mb-5">
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
