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
      <div className="padded-container grid gap-8 justify-items-center w-full h-full pt-32 pb-8 xl:grid-rows-[auto_auto_1fr] xl:grid-cols-[auto_auto] xl:justify-items-start xl:items-end xl:gap-16 xl:pt-6 xl:pb-20">
        <Breadcrumbs
          className="font-body font-normal text-xs sm:text-sm text-gray-d2 dark:text-white xl:ml-52 xl:mr-auto"
          items={[
            { title: "Marketplace", to: appRoutes.marketplace },
            { title: profile.name, to: `${appRoutes.profile}/${profile.id}` },
          ]}
        />
        <DonateButton className="order-3 xl:order-2" />

        <div className="order-2 xl:order-3 flex flex-col gap-8 w-full items-center text-center">
          <div className="flex flex-col w-full gap-2">
            <h3 className="font-header font-bold text-3xl w-full max-w-xs">
              {profile.name}
            </h3>
            <p className="font-body font-normal text-lg">
              This is 140 character tag line. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Integer viverra tortor vitae, ornare
              ac, ultricies.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <span className="flex items-center justify-center gap-2 text-sm sm:text-base font-work uppercase">
              <Icon
                type="MapPin"
                className="h-5 w-5 sm:h-6 sm:w-6 text-orange"
              />
              {profile.street_address}
            </span>
            {/* {profile.url && ( */}
            <span className="flex items-center justify-center gap-2 w-full font-sans font-medium text-sm sm:w-auto sm:text-base">
              <Icon
                type="Globe"
                className="h-5 w-5 sm:h-6 sm:w-6 text-orange"
              />
              <ExtLink
                href={profile.url}
                title="organization url"
                className="cursor-pointer hover:underline"
              >
                {/* {profile.url.replace(/^https?:\/\//i, "")} */}
                https://www.example.com
              </ExtLink>
            </span>
            {/* )} */}
          </div>
        </div>

        <GeneralInfo className="order-4 xl:col-span-2 w-full h-full" />
      </div>
    </div>
  );
}
