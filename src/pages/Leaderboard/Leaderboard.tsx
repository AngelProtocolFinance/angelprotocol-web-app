import DonationMetrics from "./DonationMetrics";
import Table from "./Table";

export default function Leaderboard() {
  return (
    <section className="grid content-start padded-container">
      <DonationMetrics />
      <h3 className="mt-6 uppercase text-white text-3xl font-bold">
        Leaderboard
      </h3>
      <Table />
    </section>
  );
}
