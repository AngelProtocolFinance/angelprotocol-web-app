import { Prompt } from "./prompt";
export { action } from "./api";
const Rejected = () => <Prompt verdict="reject" />;
export default Rejected;
export { ErrorModal as ErrorBoundary } from "components/error";
