import BaseStep from "./BaseStep";
import { BaseProps } from "./types";

type Props = BaseProps & { level: number };

export default function DocumentationStep(props: Props) {
  return (
    <BaseStep
      statusComplete={props.isComplete && `Level ${props.level}`}
      {...props}
    />
  );
}
