import AppHead from "components/Headers/AppHead";
import Liquid from "./Liquid";
import Locked from "./Locked";

export default function Withdraw() {
  return (
    <section className="pb-16 grid content-start h-screen">
      <AppHead />
      <h1 className="pt-8 padded-container uppercase text-white-grey text-3xl font-bold">
        Withdraw Page!
      </h1>
      <div className="pt-8 padded-container uppercase text-white-grey text-3xl font-bold">
        <Liquid />
        <Locked />
      </div>
    </section>
  );
}
