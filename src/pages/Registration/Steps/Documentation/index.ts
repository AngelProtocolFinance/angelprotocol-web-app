import { stepLoader } from "../../data/step-loader";
import { nextStep } from "../../routes";
import { updateAction } from "../update-action";

export { default } from "./Documentation";
export { ErrorElement } from "errors/ErrorElement";
export const clientLoader = stepLoader(4);
export const clientAction = updateAction(nextStep[4]);
