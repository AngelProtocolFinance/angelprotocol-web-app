import CharityLeaderboard from "./Board";
import DappHead from "components/Headers/DappHead";

export default function Leaderboard() {
  return (
    <section className="grid content-start padded-container">
      <DappHead />
      <h3 className="mt-6 uppercase text-white-grey text-3xl font-bold">
        Leaderboard
      </h3>
      <CharityLeaderboard />
    </section>
  );
}
