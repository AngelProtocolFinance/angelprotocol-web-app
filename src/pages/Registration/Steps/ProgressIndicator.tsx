import { RegStep } from "services/types";

const NUM_STEPS = 5;

type Props = {
  step: RegStep;
  classes?: string;
};

export default function ProgressIndicator({ step, classes = "" }: Props) {
  const percent = (step / NUM_STEPS) * 100;

  return (
    <div className={`w-full ${classes}`}>
      <div className="flex justify-between items-center mb-2">
        <p>
          {step} of {NUM_STEPS} Steps
        </p>
        <p>{percent}%</p>
      </div>
      <div className="h-4 w-full bg-white rounded-3xl">
        <div
          style={{ width: `${percent}%` }}
          className={`h-full bg-blue rounded-3xl`}
        />
      </div>
    </div>
  );
}
