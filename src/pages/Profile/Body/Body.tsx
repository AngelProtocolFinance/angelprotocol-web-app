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
        <DonateButton className="order-4 xl:order-2" />

        <div className="order-2 xl:order-3 xl:pl-2">
          <p className="font-header font-bold text-2xl max-w-[320px] truncate sm:text-3xl">
            {profile.name}
          </p>
          <p>some text</p>
        </div>

        <div className="order-3 xl:order-4 flex flex-col gap-4">
          <span className="flex items-center justify-center gap-2 text-sm sm:text-base font-work uppercase">
            <Icon type="MapPin" className="h-5 w-5 sm:h-6 sm:w-6 text-orange" />
            {profile.street_address}
          </span>
          {profile.url && (
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
                {profile.url.replace(/^https?:\/\//i, "")}
              </ExtLink>
            </span>
          )}
        </div>

        <GeneralInfo className="order-4 xl:col-span-2 w-full h-full" />
      </div>
    </div>
  );
}
