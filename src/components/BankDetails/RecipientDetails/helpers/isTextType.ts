import { Group } from "types/aws";
import { isEmpty } from "helpers";

export function isTextType(requirements: Group) {
  return (
    requirements.type === "text" ||
    requirements.type === "date" ||
    // if by some error on Wise's side there are no valuesAllowed provided for a requirement,
    // we will treat it as a "text" field
    isEmpty(requirements.valuesAllowed ?? [])
  );
}
