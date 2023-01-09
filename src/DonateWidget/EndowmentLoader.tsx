import { ReactElement } from "react";
import { useParams } from "react-router-dom";
import { EndowmentInfo } from "services/types";
import { useEndowInfoQuery } from "services/juno/custom";
import { QueryLoader } from "components/admin";
import { idParamToNum } from "helpers";

type Props = { children(data: EndowmentInfo): ReactElement };

export default function EndowmentLoader({ children }: Props) {
  const { id } = useParams<{ id: string }>();
  const endowId = idParamToNum(id);
  const queryState = useEndowInfoQuery(endowId, { skip: endowId === 0 });

  return (
    <QueryLoader
      queryState={queryState}
      messages={{
        loading: "Getting endowment info..",
        error: "Failed to get endowment info",
      }}
      classes={{ container: "text-center mt-8" }}
    >
      {(endowment) => children(endowment)}
    </QueryLoader>
  );
}
