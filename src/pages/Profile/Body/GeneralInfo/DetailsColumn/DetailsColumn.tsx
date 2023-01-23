import DonateButton from "../../DonateButton";
import Balances from "./Balances";
import Details from "./Details";
import Socials from "./Socials";
import Tags from "./Tags";

export default function DetailsColumn({ className }: { className: string }) {
  return (
    <div className="flex flex-col gap-6 w-full">
      <Balances />

      <div
        className={`${className} flex flex-col gap-8 w-full lg:w-96 p-8 border border-prim rounded text-gray-d2 dark:bg-blue-d6  dark:text-white`}
      >
        <Details />
        <Tags />
        <Socials />
        <DonateButton className="w-full" />
      </div>
    </div>
  );
}
