import { endow } from "services/types";
import { useProfileContext } from "pages/Profile/ProfileContext";
import DonateButton from "../../DonateButton";
import Balances from "./Balances";
import Details from "./Details";
import Socials from "./Socials";
import Tags from "./Tags";

export default function DetailsColumn({ className }: { className: string }) {
  const profile = useProfileContext();
  return (
    <div className="flex flex-col gap-6 w-full">
      <Balances />

      <div
        className={`${className} flex flex-col gap-8 w-full lg:w-96 p-8 border border-prim rounded text-gray-d2 dark:bg-blue-d6  dark:text-white`}
      >
        <Details {...profile} />
        {endow(profile) && <Tags {...profile} />}
        {profile.social_media_urls && (
          <Socials social_media_urls={profile.social_media_urls} />
        )}
        <DonateButton className="w-full" />
      </div>
    </div>
  );
}
