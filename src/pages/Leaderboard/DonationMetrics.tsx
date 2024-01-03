import {
  dummyDonationsMetricList as metricsPlaceholder,
  useMetricsListQuery,
} from "services/aws/business_metrics";

export default function DonationMetrics() {
  const { data: metrics = metricsPlaceholder } = useMetricsListQuery({});

  return (
    <div className="text-center">
      <h2 className="my-3 text-3xl font-extrabold">
        Total Donations: ${" "}
        {`${Number(
          metrics.donations_total_amount_v2.toFixed(2)
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
