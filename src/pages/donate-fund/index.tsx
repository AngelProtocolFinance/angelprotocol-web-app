import { skipToken } from "@reduxjs/toolkit/query";
import QueryLoader from "components/QueryLoader";
import { useParams } from "react-router";
import { useFundQuery } from "services/aws/funds";
import Content from "./content";

export function Component() {
  const params = useParams<{ id: string }>();
  const query = useFundQuery(params.id || skipToken);

  return (
    <QueryLoader
      queryState={query}
      messages={{
        loading: "Getting fundraiser info..",
        error: "Failed to get fundraiser info",
      }}
      classes={{ container: "place-self-center text-center mt-8" }}
    >
      {(fund) => <Content {...fund} />}
    </QueryLoader>
  );
}
