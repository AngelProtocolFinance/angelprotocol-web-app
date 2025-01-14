import { stepLoader } from "../../data/step-loader";
import { nextStep } from "../../routes";
import { updateAction } from "../update-action";

export { default } from "./FSAInquiry";
export { ErrorElement } from "errors/ErrorElement";
export const loader = stepLoader(3);
export const action = updateAction(nextStep[3]);
