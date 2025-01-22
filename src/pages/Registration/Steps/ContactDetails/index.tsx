import { stepLoader } from "../../data/step-loader";
import { nextStep } from "../../routes";
import { updateAction } from "../update-action";

export { default } from "./Form";
export { ErrorBoundary } from "components/error";
export const loader = stepLoader(1);
export const action = updateAction(nextStep[1]);
