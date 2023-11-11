import { useRegState, withStepGuard } from "../StepGuard";
import FSADocumentation from "./FSA";
import NonFSA from "./NonFSA";

function Documentation() {
  const { data } = useRegState<4>();

  //documentation is previously completed
  if (data.documentation && data.documentation.DocType === "FSA") {
    return <FSADocumentation doc={data.documentation} />;
  }

  if (data.documentation && data.documentation.DocType === "Non-FSA") {
    return <NonFSA doc={data.documentation} />;
  }

  //if not previously completed, depend on fsaInquiry
  if (data.fsaInquiry.AuthorizedToReceiveTaxDeductibleDonations) {
    return <FSADocumentation doc={undefined} />;
  }

  return <NonFSA doc={undefined} />;
}

export default withStepGuard(Documentation);
