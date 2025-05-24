import { Prompt } from "./prompt";
export { action } from "./api";
const Rejected = () => <Prompt verdict="rejected" />;
export default Rejected;
export { ErrorModal as ErrorBoundary } from "components/error";
