import AppHead from "components/Headers/AppHead";
import Liquid from "./Liquid";
import Locked from "./Locked";

export default function Withdraw() {
  return (
    <section className="pb-16 grid content-start h-screen">
      <AppHead />
      <div className="mt-8 mx-auto w-auto text-white-grey">
        <h2 className="pt-8 pl-5 uppercase text-lg font-bold">
          Total Balance: $5,023
        </h2>
        <div className="flex items-stretch mt-3 mx-4">
          <Liquid />
          <Locked />
        </div>
        <button className="uppercase hover:bg-blue-accent bg-angel-blue rounded-lg mt-3 ml-5 pr-4 pl-4 w-auto h-12 d-flex justify-center items-center text-sm font-bold">
          Withdraw from Liquid Account
        </button>
        <button
          disabled
          className="cursor-default uppercase bg-grey-accent rounded-lg mt-3 ml-5 pr-4 pl-4 w-auto h-12 d-flex justify-center items-center text-sm font-bold"
        >
          Change Strategies
        </button>
      </div>
    </section>
  );
}
