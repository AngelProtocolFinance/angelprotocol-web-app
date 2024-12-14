import { isIrs501c3 } from "@better-giving/registration/models";
import { useRegState, withStepGuard } from "../StepGuard";
import { FsaDocumentation } from "./FSA";
import NonFSA from "./NonFSA";

function Documentation() {
  const { data } = useRegState<4>();

  //documentation is previously completed
  if (data.docs && !isIrs501c3(data.docs)) {
    return <FsaDocumentation doc={data.docs} />;
  }

  if (data.docs && isIrs501c3(data.docs)) {
    return <NonFSA doc={data.docs} />;
  }

  //if not previously completed, depend on fsaInquiry
  if (data.irs501c3) {
    return <NonFSA doc={undefined} />;
  }

  return <FsaDocumentation doc={undefined} />;
}

export default withStepGuard(Documentation);
