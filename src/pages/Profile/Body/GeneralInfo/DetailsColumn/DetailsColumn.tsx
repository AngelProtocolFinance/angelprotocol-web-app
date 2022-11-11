import DonateButton from "../../DonateButton";
import Details from "./Details";
import Socials from "./Socials";
import Tags from "./Tags";

export default function DetailsColumn({ className }: { className: string }) {
  return (
    <div
      className={`${className} flex flex-col gap-6 w-full lg:w-96 p-8 box-border border border-gray-l2 rounded text-gray-d2 dark:bg-blue-d6 dark:border-bluegray dark:text-white`}
    >
      <DonateButton />

      <Tags />

      <p className="font-sans font-normal text-base">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer viverra
        tortor vitae, ornare ac, ultricies lacus. In sed arcu enim eu. Risus nam
        egestas sit id eget.
      </p>

      <Socials className="-mt-2 mb-4" />

      <Details />
    </div>
  );
}
