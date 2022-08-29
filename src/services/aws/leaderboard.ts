import { AWSQueryRes, Endowment, Update } from "types/aws";
import { EXPECTED_NETWORK_TYPE } from "constants/env";
import { aws } from "./aws";

interface LeaderBoardQueryRes<T> extends AWSQueryRes<T> {
  LastUpdate: string;
}
const leaderboard_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    leaderboards: builder.query<Update, unknown>({
      //TODO:refactor this query pattern - how?
      query: () => `endowments/leaderboard/${EXPECTED_NETWORK_TYPE}`,
      //transform response before saving to cache for easy lookup by component
      transformResponse: (res: LeaderBoardQueryRes<Endowment[]>) => {
        return { endowments: res.Items, last_update: res.LastUpdate };
      },
    }),
  }),
});

export const { useLeaderboardsQuery } = leaderboard_api;

export const placeholderUpdate: Update = {
  endowments: [],
  last_update: new Date().toISOString(),
};
