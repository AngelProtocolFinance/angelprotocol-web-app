import { AWSQueryRes, LeaderboardEntry, Update } from "types/aws";
import { EXPECTED_NETWORK_TYPE } from "constant/env";
import { aws } from "./aws";

interface LeaderBoardQueryRes<T> extends AWSQueryRes<T> {
  LastUpdate: string;
}
const leaderboard_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    leaderboards: builder.query<Update, unknown>({
      //TODO:refactor this query pattern - how?
      query: () => `v2/endowments/leaderboard/${EXPECTED_NETWORK_TYPE}`,
      //transform response before saving to cache for easy lookup by component
      transformResponse: (res: LeaderBoardQueryRes<LeaderboardEntry[]>) => {
        return { endowments: res.Items, last_update: res.LastUpdate };
      },
    }),
  }),
});

export const { useLeaderboardsQuery } = leaderboard_api;
