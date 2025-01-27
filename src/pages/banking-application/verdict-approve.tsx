import { Prompt } from "./prompt";
export { action } from "./verdict-action";
const Approved = () => <Prompt verdict="approved" />;
export default Approved;
export { ErrorModal as ErrorBoundary } from "components/error";
