import QueryLoader from "components/QueryLoader";
import { useFiatCurrenciesQuery } from "services/apes";
import { useUser } from "../use-user";
import Form from "./Form";

export default function EditProfile() {
  const user = useUser();
  const query = useFiatCurrenciesQuery(user.currency);
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
