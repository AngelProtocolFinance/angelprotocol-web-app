import { Prompt } from "./prompt";
export { action } from "./verdict-action";
const Rejected = () => <Prompt verdict="rejected" />;
export default Rejected;
export { ErrorModal as ErrorBoundary } from "components/error";
