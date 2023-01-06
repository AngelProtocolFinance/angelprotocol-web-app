import { useProfileContext } from "pages/Profile/ProfileContext";
import Balances from "components/Balances";
import DonateButton from "../../DonateButton";
import Details from "./Details";
import Socials from "./Socials";
import Tags from "./Tags";

export default function DetailsColumn({ className }: { className: string }) {
  const profile = useProfileContext();

  return (
    <div className="flex flex-col gap-6 w-full">
      <Balances profileId={profile.id} direction="column" />

      <div
        className={`${className} flex flex-col gap-8 w-full lg:w-96 p-8 border border-gray-l2 rounded text-gray-d2 dark:bg-blue-d6 dark:border-bluegray dark:text-white`}
      >
        <Details />
        <Tags />
        <Socials />
        <DonateButton className="w-full" />
      </div>
    </div>
  );
}
