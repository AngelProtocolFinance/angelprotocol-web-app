import { useLeaderboardsQuery } from "services/aws/leaderboard";
import { QueryLoader } from "components/admin";
import DonationMetrics from "./DonationMetrics";
import Table from "./Table";

export default function Leaderboard() {
  const queryState = useLeaderboardsQuery(null);

  return (
    <section className="bg-gray-l5 dark:bg-blue-d4 pt-24 pb-16 text-gray-d2 dark:text-white font-work">
      <div className="padded-container grid content-start mt-6">
        <DonationMetrics />
        <h3 className="mt-6 uppercase text-3xl font-bold">Leaderboard</h3>
        <QueryLoader
          queryState={queryState}
          messages={{
            loading: "Loading...",
            error: "Failed to get leaderboard data",
          }}
        >
          {(update) => (
            <>
              <p className="justify-self-end flex gap-2 text-sm font-light text-gray-d1 dark:text-gray">
                last updated:{" "}
                {new Date(update.last_update).toLocaleString([], {
                  dateStyle: "short",
                  timeStyle: "short",
                  hour12: false,
                })}
              </p>
              <Table endowments={update.endowments} classes="mt-2" />
            </>
          )}
        </QueryLoader>
      </div>
    </section>
  );
}
