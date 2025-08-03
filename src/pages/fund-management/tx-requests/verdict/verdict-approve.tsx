import { Prompt } from "./prompt";
export { action } from "./api";
const Approved = () => <Prompt verdict="approve" />;
export default Approved;
export { ErrorModal as ErrorBoundary } from "components/error";
