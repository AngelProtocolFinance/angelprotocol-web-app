import { stepLoader } from "../../data/step-loader";
import { nextStep } from "../../routes";
import { updateAction } from "../update-action";

export { default } from "./Documentation";
export { ErrorElement } from "errors/ErrorElement";
export const loader = stepLoader(4);
export const action = updateAction(nextStep[4]);
