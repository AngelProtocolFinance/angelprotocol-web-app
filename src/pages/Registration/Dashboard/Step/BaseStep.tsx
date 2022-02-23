import Button from "../../Button";
import { BaseProps } from "./types";

type Props = BaseProps & { statusComponent?: JSX.Element };

export default function BaseStep(props: Props) {
  const { title, isComplete, onClick, statusComponent } = props;

  return (
    <div className="flex justify-between w-full">
      <div className="text-left font-bold">
        <p>{title}</p>
        {statusComponent ||
          (isComplete ? (
            <p className="uppercase text-green-500">Complete</p>
          ) : (
            <p className="uppercase text-yellow-500">Missing</p>
          ))}
      </div>
      {isComplete ? (
        <Button className="bg-yellow-blue w-40 h-10" onClick={onClick}>
          Change
        </Button>
      ) : (
        <Button className="bg-thin-blue w-40 h-10" onClick={onClick}>
          Continue
        </Button>
      )}
    </div>
  );
}
