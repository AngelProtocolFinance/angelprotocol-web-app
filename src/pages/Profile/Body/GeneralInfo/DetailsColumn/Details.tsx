import { useProfileContext } from "pages/Profile/ProfileContext";

export default function Details() {
  const profile = useProfileContext();

  return (
    <>
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
    </>
  );
}

function Detail(props: { title: string; value?: string | number }) {
  return (
    <div className="flex flex-col justify-center items-start gap-2 w-full">
      <h6 className="font-header font-bold text-xs tracking-wider uppercase">
        {props.title}
      </h6>
      <span className="font-work font-normal text-base text-gray-d1 dark:text-gray">
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
