import QueryLoader from "@/components/QueryLoader";
import { idParamToNum } from "@ap/helpers";
import { useProfileQuery } from "@ap/services/aws";
import { ReactElement } from "react";
import { useParams } from "react-router-dom";
import { EndowmentProfile } from "@ap/types/aws";

type Props = { children(data: EndowmentProfile): ReactElement };

export default function EndowmentLoader({ children }: Props) {
  const { id } = useParams<{ id: string }>();
  const endowId = idParamToNum(id);
  const queryState = useProfileQuery(endowId, { skip: endowId === 0 });

  return (
    <QueryLoader
      queryState={queryState}
      messages={{
        loading: "Getting endowment info..",
        error: "Failed to get endowment info",
      }}
      classes={{ container: "text-center mt-8" }}
    >
      {(profile) => children(profile)}
    </QueryLoader>
  );
}
