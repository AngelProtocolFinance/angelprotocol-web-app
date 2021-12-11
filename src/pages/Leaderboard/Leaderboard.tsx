import BoardCharity from "./Charity/Board";
import DappHead from "components/Headers/DappHead";

export default function Leaderboard() {
  //cast names to desired type
  return (
    <section className="grid content-start">
      <DappHead />
      <h3 className="mt-6 padded-container uppercase text-white-grey text-3xl font-bold">
        Leaderboard
      </h3>
      <BoardCharity />
    </section>
  );
}
