import {
  // useRegState,
  withStepGuard,
} from "../StepGuard";
import Content from "./Content";

function BankDetails() {
  // const { data } = useRegState<3>();

  return <Content />;
}

export default withStepGuard(BankDetails);
