import { stepLoader } from "../../data/step-loader";
import { nextStep } from "../../routes";
import { updateAction } from "../update-action";

export { default } from "./FSAInquiry";
export { ErrorElement } from "errors/ErrorElement";
export const clientLoader = stepLoader(3);
export const clientAction = updateAction(nextStep[3]);
