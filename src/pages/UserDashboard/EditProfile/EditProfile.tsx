import QueryLoader from "components/QueryLoader";
import { useFiatCurrenciesQuery } from "services/apes";
import type { AuthenticatedUser } from "types/auth";
import Form from "./Form";

export default function EditProfile(props: AuthenticatedUser) {
  const query = useFiatCurrenciesQuery(props.prefCurrencyCode);
  return (
    <QueryLoader
      queryState={query}
      messages={{
        loading: "loading form",
        error: "failed to load form",
      }}
    >
      {(data) => <Form {...data} user={props} />}
    </QueryLoader>
  );
}
