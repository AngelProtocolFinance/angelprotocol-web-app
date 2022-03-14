import { aws } from "../aws";
import { DonationsMetricList } from "./types";

const business_metrics_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    metricsList: builder.query<DonationsMetricList, string>({
      // Argument attrList is a string of attributes that will be returned by the api
      query: (attrList) => {
        return {
          url: `metrics?keys=${attrList}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useMetricsListQuery } = business_metrics_api;
