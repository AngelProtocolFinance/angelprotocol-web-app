import type { DonationsMetricList } from "types/aws";
import { aws } from "./aws";

export const dummyDonationsMetricList: DonationsMetricList = {
  donations_daily_count: 0,
  donations_daily_amount: 0,
  donations_total_amount_v2: 0,
};

const business_metrics_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    metricsList: builder.query<DonationsMetricList, unknown>({
      query: () => {
        return {
          url: "v1/metrics",
          params: { keys: Object.keys(dummyDonationsMetricList) },
        };
      },
    }),
  }),
});

export const { useMetricsListQuery } = business_metrics_api;
