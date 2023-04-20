import { useParams } from "react-router-dom";
import { InReview } from "types/aws";
import { useRegQuery } from "services/aws/registration";
import QueryLoader from "components/QueryLoader";
import { SEPARATOR } from "../constants";
import Summary from "./Summary";

export default function Application() {
  const { id = "" } = useParams();
  const [appId = "", ref = ""] = id.split(SEPARATOR);
  const query = useRegQuery(ref, {
    skip: !ref || !appId,
  });

  return (
    <QueryLoader
      queryState={query}
      messages={{
        loading: "Getting registration details",
        error: "Failed to get registration details",
      }}
    >
      {(reg) => <Summary {...(reg as InReview)} appId={+appId} />}
    </QueryLoader>
  );
}
