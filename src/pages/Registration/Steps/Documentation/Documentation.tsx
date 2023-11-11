import { useRegState, withStepGuard } from "../StepGuard";
import FSADocumentation from "./FSA";
import NonFSA from "./NonFSA";

function Documentation() {
  const { data } = useRegState<4>();

  if (
    data.fsaInquiry.AuthorizedToReceiveTaxDeductibleDonations &&
    data.documentation?.DocType === "FSA"
  ) {
    return <FSADocumentation doc={data.documentation} />;
  }

  if (
    !data.fsaInquiry.AuthorizedToReceiveTaxDeductibleDonations &&
    data.documentation?.DocType === "Non-FSA"
  ) {
    return <NonFSA doc={data.documentation} />;
  }
}

export default withStepGuard(Documentation);
