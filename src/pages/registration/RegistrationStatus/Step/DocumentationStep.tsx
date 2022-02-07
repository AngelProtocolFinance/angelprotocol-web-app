import BaseStep from "./BaseStep";
import { BaseProps } from "./types";

type Props = BaseProps & { level: number };

export default function DocumentationStep(props: Props) {
  const statusComponent = props.isComplete ? (
    <p className="uppercase text-green-500">Complete - Level {props.level}</p>
  ) : (
    <p className="uppercase text-yellow-500">Missing</p>
  );
  return <BaseStep statusComponent={statusComponent} {...props} />;
}
