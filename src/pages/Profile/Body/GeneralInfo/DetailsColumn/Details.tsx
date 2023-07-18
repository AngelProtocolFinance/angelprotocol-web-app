import { PropsWithChildren } from "react";
import { Profile } from "services/types";
import { isEmpty } from "helpers";

export default function Details(props: Profile) {
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
