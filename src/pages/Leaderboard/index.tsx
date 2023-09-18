import { APP_NAME, DAPP_URL } from "constant/env";
import { useLeaderboardsQuery } from "services/aws/leaderboard";
import QueryLoader from "components/QueryLoader";
import Seo from "components/Seo";
import DonationMetrics from "./DonationMetrics";
import Table from "./Table";

export default function Leaderboard() {
  const queryState = useLeaderboardsQuery(null);

  return (
    <section className="padded-container grid content-start mt-8 pb-16 font-work">
      <Seo title={`Leaderboad - ${APP_NAME}`} url={`${DAPP_URL}/leaderboard`} />
      <DonationMetrics />
      <h3 className="mt-6 uppercase text-3xl">Impact board</h3>
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Fetching data...",
          error: "Failed to get leaderboard data",
        }}
        classes={{ container: "mt-6" }}
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
    </section>
  );
}
