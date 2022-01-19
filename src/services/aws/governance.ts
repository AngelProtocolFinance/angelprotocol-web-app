import { aws } from "./aws";

export interface StakingAPRQueryResult {
  message: string;
  stakingAPR: number;
  error: any;
}

const governance_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    stakingAPR: builder.query<StakingAPRQueryResult, any>({
      query: () => {
        return {
          url: "gov-data",
          method: "Get",
        };
      },
    }),
  }),
});

export const { useStakingAPRQuery } = governance_api;
