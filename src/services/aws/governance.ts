import { aws } from "./aws";

export interface StakingAPRQueryResult {
  message: string;
  stakingAPR: number;
  error: any;
}

const gov_api = aws.injectEndpoints({
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

export const { useStakingAPRQuery } = gov_api;
