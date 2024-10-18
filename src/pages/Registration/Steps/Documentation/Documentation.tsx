import { isIrs501c3 } from "@better-giving/registration/models";
import { useLoaderData } from "react-router-dom";
import type { RegStep4 } from "../../types";
import FSADocumentation from "./FSA";
import NonFSA from "./NonFSA";

export default function Documentation() {
  const { data } = useLoaderData() as RegStep4;

  //documentation is previously completed
  if (data.docs && !isIrs501c3(data.docs)) {
    return <FSADocumentation doc={data.docs} />;
  }

  if (data.docs && isIrs501c3(data.docs)) {
    return (
      <NonFSA
        doc={data.docs}
        initClaim={data.init.claim}
        regId={data.init.id}
      />
    );
  }

  //if not previously completed, depend on fsaInquiry
  if (data.irs501c3) {
    return (
      <NonFSA
        doc={undefined}
        initClaim={data.init.claim}
        regId={data.init.id}
      />
    );
  }

  return <FSADocumentation doc={undefined} />;
}
