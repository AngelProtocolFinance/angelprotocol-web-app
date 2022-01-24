import { Update } from "services/aws/leaderboard/types";

export type CharityParam = { address: string };

export type State = { endowmentBalances: Update[] };
