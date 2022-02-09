import { aws } from "../aws";
import { QueryRes, Update, Endowment } from "./types";

const leaderboard_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    leaderboards: builder.query<Update, boolean>({
      //TODO:refactor this query pattern - how?
      query: (isTest) =>
        `endowments/leaderboard/${isTest ? "testnet" : "mainnet"}`,
      //transform response before saving to cache for easy lookup by component
      transformResponse: (res: QueryRes<Endowment[]>) => {
        return { endowments: res.Items, last_update: res.LastUpdate };
      },
    }),
  }),
});
export const { useLeaderboardsQuery } = leaderboard_api;
