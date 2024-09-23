import { isIrs501c3 } from "types/aws";
import { useRegState, withStepGuard } from "../StepGuard";
import FSADocumentation from "./FSA";
import NonFSA from "./NonFSA";

function Documentation() {
  const { data } = useRegState<4>();

  //documentation is previously completed
  if (data.docs && !isIrs501c3(data.docs)) {
    return <FSADocumentation doc={data.docs} />;
  }

  if (data.docs && isIrs501c3(data.docs)) {
    return <NonFSA doc={data.docs} />;
  }

  //if not previously completed, depend on fsaInquiry
  if (data.irs501c3) {
    return <NonFSA doc={undefined} />;
  }

  return <FSADocumentation doc={undefined} />;
}

export default withStepGuard(Documentation);
