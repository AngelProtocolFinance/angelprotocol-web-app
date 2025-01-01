import Loader from "components/Loader";

export { default } from "./layout";
export { clientLoader } from "./loader";
export { clientAction } from "./action";
export { ErrorElement as ErrorBoundary } from "errors/ErrorElement";

export const HydrateFallback = () => (
  <Loader bgColorClass="bg-blue" gapClass="gap-2" widthClass="w-4" />
);
