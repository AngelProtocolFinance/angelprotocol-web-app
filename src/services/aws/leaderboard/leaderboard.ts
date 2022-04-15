import { aws } from "../aws";
import { Endowment, LeaderBoardQueryRes, Update } from "./types";

const leaderboard_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    leaderboards: builder.query<Update, boolean>({
      //TODO:refactor this query pattern - how?
      query: (isTest) =>
        `endowments/leaderboard/${isTest ? "testnet" : "mainnet"}`,
      //transform response before saving to cache for easy lookup by component
      transformResponse: (res: LeaderBoardQueryRes<Endowment[]>) => {
        return { endowments: res.Items, last_update: res.LastUpdate };
      },
    }),
  }),
});
export const { useLeaderboardsQuery } = leaderboard_api;
