import { PropsWithChildren } from "react";
import { useProfileContext } from "pages/Profile/ProfileContext";
import Copier from "components/Copier";
import ExtLink from "components/ExtLink";
import Icon from "components/Icon";
import { getAddressUrl, maskAddress } from "helpers";
import { IS_TEST } from "constants/env";

const CHAIN_ID = IS_TEST ? "uni-5" : "juno-1";

export default function Details() {
  const profile = useProfileContext();

  return (
    <>
      <Detail title="registration no.">{profile.registration_number}</Detail>
      <Detail title="address">
        {createAddress(profile.street_address, profile.country_of_origin)}
      </Detail>
      <Detail title="endowment address">
        <span className="flex items-center gap-4 w-full">
          <span className="hidden sm:block">
            {maskAddress(profile.owner, 14)}
          </span>
          <span className="sm:hidden">{maskAddress(profile.owner, 10)}</span>
          <Copier text={profile.owner} classes="text-2xl" />
          <ExtLink href={getAddressUrl(CHAIN_ID, profile.owner)}>
            <Icon type="ExternalLink" className="text-2xl hover:text-orange" />
          </ExtLink>
        </span>
      </Detail>
    </>
  );
}

function Detail(props: PropsWithChildren<{ title: string }>) {
  return (
    <div className="flex flex-col justify-center items-start gap-2 w-full">
      <h6 className="font-header font-bold text-xs tracking-wider uppercase">
        {props.title}
      </h6>
      <span className="font-body font-normal text-base text-gray-d1 dark:text-gray">
        {props.children || "no data"}
      </span>
    </div>
  );
}

function createAddress(
  street_address: string | undefined,
  country_of_origin: string | undefined
): string | undefined {
  if (!street_address) {
    return country_of_origin;
  } else if (!country_of_origin) {
    return street_address;
  } else {
    return street_address + ", " + country_of_origin;
  }
}
