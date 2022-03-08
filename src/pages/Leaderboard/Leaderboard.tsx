import CharityLeaderboard from "./Board";
import DonationMetrics from "./DonationMetrics";

export default function Leaderboard() {
  return (
    <section className="grid content-start padded-container">
      <DonationMetrics />
      <h3 className="mt-6 uppercase text-white-grey text-3xl font-bold">
        Leaderboard
      </h3>
      <CharityLeaderboard />
    </section>
  );
}
