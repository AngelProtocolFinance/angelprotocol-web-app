import CharityLeaderboard from "./Board";

export default function Leaderboard() {
  return (
    <section className="grid content-start padded-container">
      <h3 className="mt-6 uppercase text-white-grey text-3xl font-bold">
        Leaderboard
      </h3>
      <CharityLeaderboard />
    </section>
  );
}
