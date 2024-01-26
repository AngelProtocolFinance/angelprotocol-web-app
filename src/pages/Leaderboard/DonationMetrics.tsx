import {
  dummyDonationsMetricList as metricsPlaceholder,
  useMetricsListQuery,
} from "services/aws/business_metrics";

export default function DonationMetrics() {
  // The parameter passed to the function is a list of attrs that we want to display
  // It is a single string with the attrs being comma-separated because it will go to the request's url
  const { data: metrics = metricsPlaceholder } = useMetricsListQuery(
    "donations_total_amount_v2,donations_daily_count,donations_daily_amount",
  );

  return (
    <div className="text-center">
      <h2 className="my-3 text-3xl font-extrabold">
        Total Donations: ${" "}
        {`${Number(
          metrics.donations_total_amount.toFixed(2),
        ).toLocaleString()}`}
      </h2>
      {/*<h3 className="text-xl font-semibold">
        Daily Donations Total: ${" "}
        {`${Number(
          metrics.donations_daily_amount.toFixed(2)
        ).toLocaleString()}`}
      </h3>
      <h3 className="text-xl font-semibold">
        Daily Donations Count: {`${metrics.donations_daily_count}`}
      </h3>*/}
    </div>
  );
}
