import { PropsWithChildren } from "react";
import { EndowmentProfile } from "types/aws";
import { isEmpty } from "helpers";

// import { chainIds } from "constants/chainIds";
// import Copier from "components/Copier";
// import ExtLink from "components/ExtLink";
// import Icon from "components/Icon";
// import { getAddressUrl, maskAddress } from "helpers";

export default function Details(props: EndowmentProfile) {
  const { active_in_countries = [] } = props;

  return (
    <>
      {!!props.registration_number && (
        <Detail title="registration no.">{props.registration_number}</Detail>
      )}
      {!!props.street_address && (
        <Detail title="address">{props.street_address}</Detail>
      )}
      <Detail title="active in">
        {isEmpty(active_in_countries)
          ? props.hq_country
          : active_in_countries.join(", ")}
      </Detail>
      {/* <Detail title="endowment address">
        <span className="flex items-center gap-4 w-full">
          <span className="hidden sm:block">
            {maskAddress(profile.owner, 14)}
          </span>
          <span className="sm:hidden">{maskAddress(profile.owner, 10)}</span>
          <span className="flex items-center gap-3">
            <Copier text={profile.owner} classes="text-lg" />
            <ExtLink
              href={getAddressUrl(chainIds.juno, profile.owner)}
              className="text-lg"
            >
              <Icon type="ExternalLink" className="hover:text-orange" />
            </ExtLink>
          </span>
        </span>
      </Detail> */}
    </>
  );
}

function Detail(props: PropsWithChildren<{ title: string }>) {
  return (
    <div className="flex flex-col justify-center items-start gap-2 w-full">
      <p className="font-heading font-bold text-xs tracking-wider uppercase">
        {props.title}
      </p>
      <span className="font-body font-normal text-base text-gray-d1 dark:text-gray">
        {props.children || "-"}
      </span>
    </div>
  );
}
