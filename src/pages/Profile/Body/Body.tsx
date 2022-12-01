import Breadcrumbs from "components/Breadcrumbs";
import ExtLink from "components/ExtLink";
import Icon from "components/Icon";
import { appRoutes } from "constants/routes";
import { useProfileContext } from "../ProfileContext";
import DonateButton from "./DonateButton";
import GeneralInfo from "./GeneralInfo";

export default function Body() {
  const profile = useProfileContext();

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="padded-container grid gap-8 justify-items-center w-full h-full pt-32 pb-8 lg:grid-rows-[auto_auto_1fr] lg:grid-cols-[1fr_auto] lg:justify-items-start lg:items-end lg:gap-16 lg:pt-6 lg:pb-20">
        <Breadcrumbs
          className="font-body font-normal text-xs sm:text-sm text-gray-d2 dark:text-white lg:ml-52"
          items={[
            { title: "Marketplace", to: appRoutes.marketplace },
            { title: profile.name, to: `${appRoutes.profile}/${profile.id}` },
          ]}
        />
        <DonateButton className="order-3 lg:order-2 w-full lg:w-48" />

        <div className="order-2 lg:order-3 lg:col-span-2 flex flex-col gap-8 w-full items-center font-body">
          <div className="flex flex-col items-center w-full gap-2 text-center">
            <h3 className="font-header font-bold text-3lg w-full max-w-2lg truncate">
              {profile.name}
            </h3>
            <p className="font-normal text-lg">
              This is 140 character tag line. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Integer viverra tortor vitae, ornare
              ac, ultricies.
            </p>
          </div>
          <div className="flex flex-col gap-4 items-center font-semibold text-base">
            <span className="flex items-center gap-2 uppercase">
              <Icon type="MapPin" className="h-6 w-6 text-orange" />
              {profile.street_address}
            </span>
            {/* {profile.url && ( */}
            <span className="flex items-center gap-2">
              <Icon type="Globe" className="h-6 w-6 text-orange" />
              <ExtLink
                href={profile.url}
                title="organization website"
                className="cursor-pointer underline decoration-1 hover:text-orange hover:decoration-2"
              >
                {/* {profile.url.replace(/^https?:\/\//i, "")} */}
                someexampleurl.com
              </ExtLink>
            </span>
            {/* )} */}
          </div>
        </div>

        <GeneralInfo className="order-4 lg:col-span-2 w-full h-full" />
      </div>
    </div>
  );
}
