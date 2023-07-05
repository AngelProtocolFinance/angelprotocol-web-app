import { useParams } from "react-router-dom";
import { InReview } from "types/aws";
import { useRegQuery } from "services/aws/registration";
import QueryLoader from "components/QueryLoader";
import Summary from "./Summary";

export default function Application() {
  const { ref = "" } = useParams();
  const query = useRegQuery(ref, {
    skip: !ref,
  });

  return (
    <QueryLoader
      queryState={query}
      messages={{
        loading: "Getting registration details",
        error: "Failed to get registration details",
      }}
    >
      {(reg) => <Summary {...(reg as InReview)} />}
    </QueryLoader>
  );
}
