import { useEndowmentsQuery } from "services/juno/account";
import { QueryLoader } from "components/admin";
import Card from "./Card";

export default function Cards() {
  const queryState = useEndowmentsQuery({});

  return (
    <QueryLoader
      queryState={queryState}
      messages={{
        error: "Failed to get endowments..",
        loading: "Getting endowments..",
        empty: "No endowments found",
      }}
      classes={{ container: "place-self-center" }}
    >
      {(endowments) => (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 content-start">
          {endowments.map((endow) => (
            <Card {...endow} key={endow.id} />
          ))}
        </div>
      )}
    </QueryLoader>
  );
}
