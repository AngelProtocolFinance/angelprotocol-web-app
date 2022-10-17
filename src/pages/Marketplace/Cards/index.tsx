import { useEndowmentsQuery } from "services/juno/account";
import { QueryLoader } from "components/admin";
import Card from "./Card";

export default function Cards({ classes = "" }: { classes?: string }) {
  const queryState = useEndowmentsQuery({});

  return (
    <QueryLoader
      queryState={queryState}
      messages={{
        error: "Failed to get endowments",
        loading: "Getting endowments..",
        empty: "No endowments found",
      }}
      classes={{
        container: `mt-10 ml-10 ${classes} dark:text-white`,
      }}
    >
      {(endowments) => (
        <div
          className={`${classes} grid grid-cols-[repeat(auto-fit,minmax(245px,1fr))] gap-4 content-start`}
        >
          {endowments.map((endow) => (
            <Card {...endow} key={endow.id} />
          ))}
        </div>
      )}
    </QueryLoader>
  );
}
