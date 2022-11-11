import { PropsWithChildren } from "react";
import { useProfileContext } from "pages/Profile/ProfileContext";
import Icon from "components/Icon";
import { unsdgs } from "constants/unsdgs";
import DonateButton from "../../DonateButton";
import Socials from "./Socials";

export default function InfoColumn() {
  const profile = useProfileContext();

  return (
    <div className="flex flex-col gap-6 w-full lg:w-96 h-[928px] p-8 box-border border border-gray-l2 rounded text-gray-d2">
      <DonateButton />

      <div className="flex flex-col items-start gap-3">
        {profile.kyc_donors_only && (
          <Tag>
            Verification required <Icon type="Warning" />
          </Tag>
        )}
        <Tag>501 (c) Non-profit</Tag>
        {profile.categories.sdgs.map((unsdg_num) => (
          <Tag key={unsdg_num}>
            SDG #{unsdg_num} : {unsdgs[unsdg_num].title}
          </Tag>
        ))}
      </div>

      <p className="font-sans font-normal text-base">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer viverra
        tortor vitae, ornare ac, ultricies lacus. In sed arcu enim eu. Risus nam
        egestas sit id eget.
      </p>

      <Socials className="-mt-2 mb-4" />

      <Detail title="registration no." value={profile.registration_number} />
      <Detail
        title="address"
        value={createAddress(profile.street_address, profile.country_of_origin)}
      />
      <Detail
        title="average annual budget"
        value={profile.average_annual_budget}
      />
      <Detail title="average annual donations" value={profile.annual_revenue} />
      <Detail
        title="no. of employees"
        value={
          profile.number_of_employees
            ? `1-${profile.number_of_employees} people`
            : "1 person"
        }
      />
      <Detail
        title="navigation rating"
        value={profile.charity_navigator_rating}
      />
    </div>
  );
}

const Tag = (props: PropsWithChildren<{}>) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-blue-l4 rounded-[20px] font-body font-semibold text-sm">
    {props.children}
  </div>
);

function Detail(props: { title: string; value?: string | number }) {
  return (
    <div className="flex flex-col justify-center items-start gap-2 w-full">
      <h6 className="font-header font-bold text-xs tracking-wider uppercase">
        {props.title}
      </h6>
      <span className="font-work font-normal text-base text-gray-d1">
        {props.value || "no data"}
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
