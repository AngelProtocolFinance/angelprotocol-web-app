import DonateButton from "../../DonateButton";
import Details from "./Details";
import Socials from "./Socials";
import Tags from "./Tags";

export default function DetailsColumn({ className }: { className: string }) {
  return (
    <div
      className={`${className} flex flex-col gap-6 w-full lg:w-96 p-4 border border-gray-l2 rounded text-gray-d2 dark:bg-blue-d6 dark:border-bluegray dark:text-white sm:p-8`}
    >
      <DonateButton />

      <Tags />

      <Socials className="mb-4" />

      <Details />
    </div>
  );
}
