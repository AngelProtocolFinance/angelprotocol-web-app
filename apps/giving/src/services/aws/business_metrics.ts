import { DonationsMetricList } from "@ap/types/aws";
import { aws } from "./aws";

export const dummyDonationsMetricList: DonationsMetricList = {
  donations_daily_count: 0,
  donations_daily_amount: 0,
  donations_total_amount: 0,
};

const business_metrics_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    metricsList: builder.query<DonationsMetricList, string>({
      // Argument attrList is a string of attributes that will be returned by the api
      query: (attrList) => {
        return {
          url: `v1/metrics?keys=${attrList}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useMetricsListQuery } = business_metrics_api;
