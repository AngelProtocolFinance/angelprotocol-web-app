import { stepLoader } from "../../data/step-loader";
import { nextStep } from "../../routes";
import { updateAction } from "../update-action";

export { default } from "./Form";
export { ErrorElement } from "errors/ErrorElement";
export const clientLoader = stepLoader(1);
export const clientAction = updateAction(nextStep[1]);
