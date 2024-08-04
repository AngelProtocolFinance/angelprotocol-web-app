import QueryLoader from "components/QueryLoader";
import { useAuthenticatedUser } from "contexts/Auth";
import { useFiatCurrenciesQuery } from "services/apes";
import Form from "./Form";

export default function EditProfile() {
  const user = useAuthenticatedUser();
  const query = useFiatCurrenciesQuery(user.prefCurrencyCode);
  return (
    <QueryLoader
      queryState={query}
      messages={{
        loading: "loading form",
        error: "failed to load form",
      }}
    >
      {(data) => <Form {...data} user={user} />}
    </QueryLoader>
  );
}
