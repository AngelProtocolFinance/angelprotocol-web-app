import Button from "../../Button";
import { BaseProps } from "./types";

type Props = BaseProps & { statusComplete?: string | false };

export default function BaseStep(props: Props) {
  const { title, isComplete, onClick, statusComplete } = props;

  return (
    <div className="flex justify-end items-center w-full font-bold">
      <p className="mr-auto">{title}</p>
      {isComplete ? (
        <p className="uppercase text-green-500 w-40">
          {statusComplete || "Complete"}
        </p>
      ) : (
        <p className="uppercase text-yellow-500 w-40">Missing</p>
      )}
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
